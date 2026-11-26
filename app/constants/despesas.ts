export const configDespesas = {
	redirect: `/despesas`,
	label: "Despesas",
};

const configRouter = {
	label: configDespesas.label,
	url: configDespesas.redirect,
};

export const breadCrumbDespesas = {
	home: {
		redirect: configDespesas.redirect,
		router: [configRouter],
	},
	novo: {
		redirect: configDespesas.redirect,
		router: [configRouter, { label: "Novo" }],
	},
	editar: {
		redirect: configDespesas.redirect,
		router: [configRouter, { label: "Editar" }],
	},
};
