export const configStatus = {
	redirect: "/status",
	label: "Status",
};
const configRouter = { label: configStatus.label, url: configStatus.redirect };

export let breadCrumbStatus = {
	home: {
		redirect: configStatus.redirect,
		router: [configRouter],
	},
	novo: {
		redirect: configStatus.redirect,
		router: [configRouter, { label: "Novo" }],
	},
	editar: {
		redirect: configStatus.redirect,
		router: [configRouter, { label: "Editar" }],
	},
};
