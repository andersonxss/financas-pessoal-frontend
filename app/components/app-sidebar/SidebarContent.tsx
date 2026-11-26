import { Wallet } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import SidebarNavigation from "./SidebarNavigation";
import SidebarUserMenu from "./SidebarUserMenu";

interface SidebarContentProps {
	collapsed?: boolean;
	onNavigate?: () => void;
	onSignOut?: () => void;
}

export default function SidebarContent({
	collapsed = false,
	onNavigate,
	onSignOut,
}: SidebarContentProps) {
	return (
		<div className="flex h-full min-h-0 flex-col gap-5 p-3">
			<Link
				to="/home"
				onClick={onNavigate}
				aria-label="Finanças — início"
				className={cn(
					"flex h-14 shrink-0 items-center gap-3 rounded-2xl p-2 outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring",
					collapsed && "justify-center",
				)}
			>
				<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_8px_20px_-12px_rgba(112,137,18,0.7)]">
					<Wallet className="size-4" aria-hidden="true" />
				</span>
				{!collapsed && (
					<span className="truncate text-base font-extrabold tracking-tight">
						Finanças
					</span>
				)}
			</Link>
			<SidebarNavigation collapsed={collapsed} onNavigate={onNavigate} />
			<SidebarUserMenu collapsed={collapsed} onSignOut={onSignOut} />
		</div>
	);
}
