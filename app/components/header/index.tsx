import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import useMenuHooks from "@/hooks/useMenu.hooks";

export default function Header({
	sidebarTrigger,
}: {
	sidebarTrigger: ReactNode;
}) {
	const { pathname } = useLocation();
	const { navigationLinks } = useMenuHooks();
	const currentGroup = navigationLinks.find(
		(group) =>
			group.items?.some(
				(item) =>
					pathname === `/${item.href}` || pathname.startsWith(`/${item.href}/`),
			) || pathname === `/${group.href}`,
	);
	const currentItem = currentGroup?.items?.find(
		(item) =>
			pathname === `/${item.href}` || pathname.startsWith(`/${item.href}/`),
	);
	const action = pathname.endsWith("/create")
		? "Novo"
		: pathname.includes("/edit/")
			? "Editar"
			: undefined;

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/80 bg-white px-3 md:h-[72px] md:px-6">
			{sidebarTrigger}
			<span aria-hidden="true" className="mx-2 h-4 w-px bg-border" />
			<nav aria-label="Localização" className="min-w-0">
				<ol className="flex items-center gap-2 text-sm font-medium">
					{currentGroup?.submenu && (
						<>
							<li className="hidden text-muted-foreground sm:block">
								{currentGroup.label}
							</li>
							<li aria-hidden="true" className="hidden sm:block">
								<ChevronRight className="size-4 text-muted-foreground" />
							</li>
						</>
					)}
					<li className="truncate">
						{action && currentItem ? (
							<Link
								to={`/${currentItem.href}`}
								className="text-muted-foreground hover:text-foreground"
							>
								{currentItem.label}
							</Link>
						) : (
							<span aria-current="page">
								{currentItem?.label ?? currentGroup?.label ?? "Finanças"}
							</span>
						)}
					</li>
					{action && (
						<>
							<li aria-hidden="true">
								<ChevronRight className="size-4 text-muted-foreground" />
							</li>
							<li aria-current="page">{action}</li>
						</>
					)}
				</ol>
			</nav>
		</header>
	);
}
