import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen, Plus } from "lucide-react";

type DialogCustomProps = {
	children: React.ReactNode;
	title?: string;
	description?: string;
	descriptionButton?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export function DialogCustom({
	children,
	descriptionButton,
	title,
	description,
	open,
	onOpenChange,
}: DialogCustomProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				{descriptionButton ? (
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						{descriptionButton}
					</Button>
				) : (
					<Button size="icon-sm" variant="outline">
						<SquarePen />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-md w-full">
				<DialogHeader>
					{title && <DialogTitle>{title}</DialogTitle>}
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
}
