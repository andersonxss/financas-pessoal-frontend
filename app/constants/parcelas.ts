export const configParcelas = {
	redirect: "/parcelas",
	label: "Parcelas",
};

const configRouter = {
	label: configParcelas.label,
	url: configParcelas.redirect,
};

export const breadCrumbParcelas = {
	home: {
		redirect: configParcelas.redirect,
		router: [configRouter],
	},
	novo: {
		redirect: configParcelas.redirect,
		router: [configRouter, { label: "Novo" }],
	},
	editar: {
		redirect: configParcelas.redirect,
		router: [configRouter, { label: "Editar" }],
	},
};
