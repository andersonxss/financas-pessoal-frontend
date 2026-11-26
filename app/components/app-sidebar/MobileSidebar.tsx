import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import SidebarContent from "./SidebarContent";

interface MobileSidebarProps {
	onNavigate: () => void;
	onSignOut?: () => void;
}

export default function MobileSidebar({
	onNavigate,
	onSignOut,
}: MobileSidebarProps) {
	return (
		<DialogContent
			showCloseButton={false}
			className="inset-y-0 left-0 flex h-svh w-72 max-w-[calc(100%-2rem)] translate-x-0 translate-y-0 flex-col gap-0 rounded-l-none rounded-r-[28px] border-0 bg-sidebar p-0 text-sidebar-foreground data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 sm:max-w-72 motion-reduce:animate-none"
		>
			<DialogTitle className="sr-only">Menu principal</DialogTitle>
			<DialogDescription className="sr-only">
				Navegue pelas áreas do sistema financeiro.
			</DialogDescription>
			<DialogClose asChild>
				<Button
					variant="ghost"
					size="icon"
					className="absolute top-3 right-3"
					aria-label="Fechar menu"
				>
					<X className="size-4" />
				</Button>
			</DialogClose>
			<SidebarContent onNavigate={onNavigate} onSignOut={onSignOut} />
		</DialogContent>
	);
}
