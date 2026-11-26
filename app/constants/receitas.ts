export const configReceitas = {
	redirect: "/receitas",
	label: "Receitas",
};

const configRouter = {
	label: configReceitas.label,
	url: configReceitas.redirect,
};

export const breadCrumbReceitas = {
	home: {
		redirect: configReceitas.redirect,
		router: [configRouter],
	},
	novo: {
		redirect: configReceitas.redirect,
		router: [configRouter, { label: "Novo" }],
	},
	editar: {
		redirect: configReceitas.redirect,
		router: [configRouter, { label: "Editar" }],
	},
};
