const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const ts = require("typescript");

// Transpile the real modules with the installed compiler; replace only the UI
// and HTTP boundaries so these tests never create records in the database.
function loadModule(relativePath, dependencies = {}) {
	const filename = path.resolve(__dirname, "..", relativePath);
	const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
		fileName: filename,
		compilerOptions: {
			module: ts.ModuleKind.CommonJS,
			target: ts.ScriptTarget.ES2022,
			jsx: ts.JsxEmit.ReactJSX,
			esModuleInterop: true,
		},
	});
	const module = { exports: {} };
	const resolveDependency = (specifier) => {
		if (Object.hasOwn(dependencies, specifier)) return dependencies[specifier];
		if (specifier.startsWith("@/"))
			throw new Error("Unmapped dependency: " + specifier);
		return require(specifier);
	};
	new Function("require", "module", "exports", outputText)(
		resolveDependency,
		module,
		module.exports,
	);
	return module.exports;
}

const status = loadModule("app/constants/tipoStatus.ts");
const schema = loadModule("app/feature/categorias/categoriasSchema.ts");
const responses = loadModule("app/utils/responsFunc.ts");
const constants = loadModule("app/constants/categoria.ts");

function createSubject(error) {
	const calls = [];
	const api = {
		async post(url, payload) {
			calls.push({ url, payload });
			if (error) throw error;
			return { data: { id: "created-category", ...payload } };
		},
	};
	const service = loadModule("app/server/categorias.server.ts", {
		"@/constants": constants,
		"@/api": api,
	});
	const route = loadModule("app/routes/categorias/categorias.create.tsx", {
		"@/server/categorias.server": service,
		"@/feature/categorias/categoriasSchema": schema,
		"@/utils": responses,
		"@/components/page": () => null,
		"@/feature/categorias/categoriasForms": () => null,
		"@/constants/tipoStatus": status,
	});
	return { ...route, calls };
}

function request(fields) {
	return {
		request: new Request("http://localhost/categorias/create", {
			method: "POST",
			body: new URLSearchParams(fields),
		}),
		params: {},
		context: {},
	};
}

test("o formulario envia o UUID do status ativo, nao o rotulo", () => {
	const subject = createSubject();
	const page = subject.default();
	const form = page.props.children;
	const fields = form.props.children.props.defaultValues;
	assert.equal(fields.status_id, status.statusAtivoId);
});

test("action envia os campos validados para postCategoria e redireciona", async () => {
	const subject = createSubject();
	const response = await subject.action(
		request({
			name: "Categoria de teste",
			status_id: status.statusAtivoId,
			unexpected: "nao enviar",
		}),
	);
	assert.deepEqual(subject.calls, [
		{
			url: "/categorias",
			payload: { name: "Categoria de teste", status_id: status.statusAtivoId },
		},
	]);
	assert.equal(response.status, 302);
	assert.equal(response.headers.get("Location"), "/categorias");
});

test("nome vazio retorna 400 sem chamar a API", async () => {
	const subject = createSubject();
	const response = await subject.action(
		request({ name: "", status_id: status.statusAtivoId }),
	);
	assert.equal(response.init.status, 400);
	assert.deepEqual(response.data.errors.fieldErrors.name, [
		"Categoria é campo obrigatório.",
	]);
	assert.equal(subject.calls.length, 0);
});

test("rotulo Ativo no lugar do UUID retorna 400 sem chamar a API", async () => {
	const subject = createSubject();
	const response = await subject.action(
		request({ name: "Categoria de teste", status_id: "Ativo" }),
	);
	assert.equal(response.init.status, 400);
	assert.ok(response.data.errors.fieldErrors.status_id.length);
	assert.equal(subject.calls.length, 0);
});

test("status ausente retorna 400 sem chamar a API", async () => {
	const subject = createSubject();
	const response = await subject.action(
		request({ name: "Categoria de teste" }),
	);
	assert.equal(response.init.status, 400);
	assert.ok(response.data.errors.fieldErrors.status_id.length);
	assert.equal(subject.calls.length, 0);
});

test("falha de postCategoria e propagada sem redirecionar como sucesso", async () => {
	const error = new Error("API indisponivel");
	const subject = createSubject(error);
	await assert.rejects(
		subject.action(
			request({
				name: "Categoria de teste",
				status_id: status.statusAtivoId,
			}),
		),
		(received) => received === error,
	);
	assert.equal(subject.calls.length, 1);
});
