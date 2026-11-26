import type { ReactNode } from "react";
import Header from "@/components/header";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import MobileSidebar from "./MobileSidebar";
import SidebarContent from "./SidebarContent";
import SidebarToggle from "./SidebarToggle";
import useSidebarState from "./useSidebarState";

interface AppSidebarLayoutProps {
	children: ReactNode;
	onSignOut?: () => void;
}

export default function AppSidebarLayout({
	children,
	onSignOut,
}: AppSidebarLayoutProps) {
	const { collapsed, mobileOpen, setMobileOpen, toggleCollapsed, closeMobile } =
		useSidebarState();

	return (
		<Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
			<div className="flex min-h-svh w-full bg-[#EEF2F2] text-sidebar-foreground">
				<a
					href="#conteudo-principal"
					className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:p-3"
				>
					Pular para o conteúdo
				</a>
				<aside
					id="sidebar-desktop"
					aria-label="Navegação lateral"
					className={cn(
						"sticky top-0 hidden h-svh shrink-0 md:block",
						collapsed ? "w-16" : "w-64",
					)}
				>
					<SidebarContent collapsed={collapsed} onSignOut={onSignOut} />
				</aside>
				<MobileSidebar onNavigate={closeMobile} onSignOut={onSignOut} />
				<div className="flex min-w-0 flex-1 flex-col bg-background text-foreground md:my-3 md:mr-3 md:overflow-hidden md:rounded-[32px] md:shadow-[0_18px_50px_-34px_rgba(26,26,26,0.35)]">
					<Header
						sidebarTrigger={
							<SidebarToggle collapsed={collapsed} onToggle={toggleCollapsed} />
						}
					/>

					<main
						id="conteudo-principal"
						tabIndex={-1}
						className="min-w-0 flex-1 outline-none"
					>
						{children}
					</main>
				</div>
			</div>
		</Dialog>
	);
}
