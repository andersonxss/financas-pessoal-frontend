export const configCategorias = {
	redirect: "/categorias",
	label: "Categorias",
};
const configRouter = {
	label: configCategorias.label,
	url: configCategorias.redirect,
};

export const breadCrumbCategorias = {
	home: {
		redirect: configCategorias.redirect,
		router: [configRouter],
	},
	novo: {
		redirect: configCategorias.redirect,
		router: [configRouter, { label: "Novo" }],
	},
	editar: {
		redirect: configCategorias.redirect,
		router: [configRouter, { label: "Editar" }],
	},
};
