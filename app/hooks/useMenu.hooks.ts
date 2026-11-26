import { useRouteLoaderData } from "react-router";
import type { SessionUser } from "@/root";

const useMenuHooks = () => {
	const data = useRouteLoaderData("root") as { user: SessionUser | null } | undefined;

	const role = data?.user?.role;
	const navigationLinks = [
		{ icon: "HomeIcon", href: "home", label: "Home" },
		{
			label: "Financeiro",
			submenu: true,
			type: "icon",
			items: [
				{ icon: "BanknoteArrowDown", href: "despesas", label: "Despesas" },
				{ icon: "BadgeDollarSign", href: "receitas", label: "Receita" },
			],
		},
		{
			label: "Administrativo",
			submenu: true,
			type: "icon",
			items: [
				{
					href: "parcelas",
					label: "Parcelas",
				},
				{
					href: "pagamentos",
					label: "Pagamentos",
				},
				{
					href: "categorias",
					label: "Categoria",
				},
				{
					href: "status",
					label: "Status",
				},
			],
		},
		...(role === "ADMIN" || role === "SUPER_ADMIN"
			? [
				{
					label: "Organização",
					submenu: true,
					type: "icon",
					items: [
						{ href: "admin/membros", label: "Membros e convites" },
						...(role === "SUPER_ADMIN"
							? [{ href: "admin/tenants", label: "Tenants" }]
							: []),
					],
				},
			]
			: []),
	];

	return { navigationLinks };
};

export default useMenuHooks;
