const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

function loadTs(relative) {
  const filename = path.resolve(__dirname, '..', relative);
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = mod.require.bind(mod);
  mod.require = (id) => id.endsWith('/moneySchema') ? loadTs('app/utils/moneySchema.ts') : originalRequire(id);
  mod._compile(compiled, filename);
  return mod.exports;
}

for (const name of ['despesas', 'receitas']) {
  const schema = loadTs('app/feature/' + name + '/schema/' + name + 'Schema.ts')[name + 'Schema'].shape.valor;
  for (const [input, expected] of [['0.01', 0.01], ['0.29', 0.29], ['1.10', 1.1], ['1234.56', 1234.56], ['0', 0], ['-0.01', -0.01], ['99999999.99', 99999999.99], [0.01, 0.01]]) {
    test(name + ': preserves ' + input, async () => assert.equal(await schema.parseAsync(input), expected));
  }
  for (const input of ['', ' ', null, undefined, '0.001', '1.234,56', 'R$ 0,01', '1abc', 'Infinity', Infinity, NaN, '100000000', '1e2']) {
    test(name + ': rejects ' + String(input), async () => assert.equal((await schema.safeParseAsync(input)).success, false));
  }
}
