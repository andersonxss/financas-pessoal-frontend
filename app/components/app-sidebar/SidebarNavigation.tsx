import { Home } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import useMenuHooks from "@/hooks/useMenu.hooks";
import { cn } from "@/lib/utils";
import SidebarNavigationGroup from "./SidebarNavigationGroup";

interface SidebarNavigationProps {
	collapsed: boolean;
	onNavigate?: () => void;
}

export default function SidebarNavigation({
	collapsed,
	onNavigate,
}: SidebarNavigationProps) {
	const { navigationLinks } = useMenuHooks();
	const { pathname } = useLocation();
	return (
		<nav aria-label="Menu principal" className="min-h-0 flex-1 overflow-y-auto">
			{!collapsed && (
				<p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
					Navegação
				</p>
			)}
			<ul className="space-y-1">
				{navigationLinks.map((group) => (
					<li key={group.label}>
						{group.submenu && group.items ? (
							<SidebarNavigationGroup
								group={{ label: group.label, items: group.items }}
								collapsed={collapsed}
								onNavigate={onNavigate}
							/>
						) : (
							<Tooltip>
								<TooltipTrigger asChild>
									<NavLink
										to={`/${group.href}`}
										onClick={onNavigate}
										aria-label={group.label}
										className={cn(
											"flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring",
											pathname === `/${group.href}` &&
												"bg-sidebar-primary font-bold text-sidebar-primary-foreground",
											collapsed && "justify-center px-0",
										)}
									>
										<Home className="size-4 shrink-0" aria-hidden="true" />
										{!collapsed && <span>{group.label}</span>}
									</NavLink>
								</TooltipTrigger>
								{collapsed && (
									<TooltipContent side="right">{group.label}</TooltipContent>
								)}
							</Tooltip>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}
