import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	// Root redirects to home
	index("routes/_index.tsx"),
	route("login", "routes/login.tsx"),
	route("recuperar-senha", "routes/recuperar-senha.tsx"),
	route("reset-password", "routes/reset-password.tsx"),
	route("aceitar-convite", "routes/aceitar-convite.tsx"),
	route("logout", "routes/logout.tsx"),


	// Admin
	route("admin/tenants", "routes/admin/tenants.tsx"),
	route("admin/membros", "routes/admin/membros/membros._index.tsx"),
	route("admin/convites/create", "routes/admin/convites/convites.create.tsx"),

	// Home
	route("home", "routes/home._index.tsx"),

	// Despesas
	route("despesas", "routes/despesas/despesas._index.tsx"),
	route("despesas/:ano/:mes", "routes/despesas/despesas.$ano.$mes.tsx"),
	route("despesas/create", "routes/despesas/despesas.create.tsx"),
	route("despesas/edit/:id", "routes/despesas/despesas.edit.$id.tsx"),
	route("despesas/delete/:id", "routes/despesas/despesas.delete.$id.tsx"),
	route(
		"despesas/status/:id/:status",
		"routes/despesas/despesas.status.$id.$status.tsx",
	),
	route("despesas/documentos", "routes/despesas/documentos/documentos._index.tsx"),
	route("despesas/temporarias", "routes/despesas/temporarias/temporarias._index.tsx"),
	route("despesas/temporarias/:id", "routes/despesas/temporarias/temporarias.$id.tsx"),
	route("despesas/temporarias/delete/:id", "routes/despesas/temporarias/temporarias.delete.$id.tsx"),

	// Categorias
	route("categorias", "routes/categorias/categorias._index.tsx"),
	route("categorias/create", "routes/categorias/categorias.create.tsx"),
	route("categorias/edit/:id", "routes/categorias/categorias.edit.$id.tsx"),
	route("categorias/delete/:id", "routes/categorias/categorias.delete.$id.tsx"),

	// Pagamentos
	route("pagamentos", "routes/pagamentos/pagamentos._index.tsx"),
	route("pagamentos/create", "routes/pagamentos/pagamentos.create.tsx"),
	route("pagamentos/edit/:id", "routes/pagamentos/pagamentos.edit.$id.tsx"),
	route("pagamentos/delete/:id", "routes/pagamentos/pagamentos.delete.$id.tsx"),

	// Parcelas
	route("parcelas", "routes/parcelas/parcelas._index.tsx"),
	route("parcelas/create", "routes/parcelas/parcelas.create.tsx"),
	route("parcelas/edit/:id", "routes/parcelas/parcelas.edit.$id.tsx"),
	route("parcelas/delete/:id", "routes/parcelas/parcelas.delete.$id.tsx"),

	// Receitas
	route("receitas", "routes/receitas/receitas._index.tsx"),
	route("receitas/:ano/:mes", "routes/receitas/receitas.$ano.$mes.tsx"),
	route("receitas/create", "routes/receitas/receitas.create.tsx"),
	route("receitas/edit/:id", "routes/receitas/receitas.edit.$id.tsx"),
	route("receitas/delete/:id", "routes/receitas/receitas.delete.$id.tsx"),
	route(
		"receitas/status/:id/:status",
		"routes/receitas/receitas.status.$id.$status.tsx",
	),

	// Status
	route("status", "routes/status/status._index.tsx"),
	route("status/create", "routes/status/status.create.tsx"),
	route("status/edit/:id", "routes/status/status.edit.$id.tsx"),
	route("status/delete/:id", "routes/status/status.delete.$id.tsx"),
] satisfies RouteConfig;
