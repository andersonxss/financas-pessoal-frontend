import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

interface SidebarToggleProps {
	collapsed: boolean;
	onToggle: () => void;
}

export default function SidebarToggle({
	collapsed,
	onToggle,
}: SidebarToggleProps) {
	return (
		<>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="hidden md:inline-flex"
				aria-label={
					collapsed ? "Expandir menu lateral" : "Recolher menu lateral"
				}
				aria-expanded={!collapsed}
				aria-controls="sidebar-desktop"
				onClick={onToggle}
			>
				<PanelLeft className="size-4" aria-hidden="true" />
			</Button>
			<DialogTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="size-11 md:hidden"
					aria-label="Abrir menu lateral"
				>
					<PanelLeft className="size-5" aria-hidden="true" />
				</Button>
			</DialogTrigger>
		</>
	);
}
