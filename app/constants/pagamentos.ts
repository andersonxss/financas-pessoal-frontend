export const configPagamentos = {
	redirect: "/pagamentos",
	label: "Tipo de Pagamento",
};
const configRouter = {
	label: configPagamentos.label,
	url: configPagamentos.redirect,
};

export const breadCrumbPagamentos = {
	home: {
		redirect: configPagamentos.redirect,
		router: [configRouter],
	},
	novo: {
		redirect: configPagamentos.redirect,
		router: [configRouter, { label: "Novo" }],
	},
	editar: {
		redirect: configPagamentos.redirect,
		router: [configRouter, { label: "Editar" }],
	},
};
