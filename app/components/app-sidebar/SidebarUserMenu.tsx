import { ChevronsUpDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRouteLoaderData } from "react-router";
import type { SessionUser } from "@/root";

interface SidebarUserMenuProps {
	collapsed: boolean;
	onSignOut?: () => void;
}

export default function SidebarUserMenu({
	collapsed,
	onSignOut,
}: SidebarUserMenuProps) {
	const data = useRouteLoaderData("root") as { user: SessionUser | null } | undefined;
	const user = data?.user;
	return (
		<div className="shrink-0 border-t border-sidebar-border pt-3">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						aria-label="Menu do usuário"
						className={cn(
							"h-12 w-full justify-start gap-3 rounded-xl px-2 hover:bg-sidebar-accent",
							collapsed && "justify-center",
						)}
					>
						<span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-accent">
							<User className="size-4" aria-hidden="true" />
						</span>
						{!collapsed && (
							<>
								<span className="min-w-0 flex-1 text-left">
									<span className="block truncate">{user?.name ?? "Usuário"}</span>
									<span className="block truncate text-xs font-normal text-muted-foreground">{user?.email}</span>
								</span>
								<ChevronsUpDown className="size-4" aria-hidden="true" />
							</>
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					side={collapsed ? "right" : "top"}
					align="start"
					className="w-56"
				>
					<DropdownMenuLabel>{user?.name ?? "Usuário"}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={onSignOut} disabled={!onSignOut}>
						<LogOut className="size-4" aria-hidden="true" /> Sair
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
