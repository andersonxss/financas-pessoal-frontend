import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface IProps {
	idPag: string;
	module: string;
	router?: string;
	text?: string;
}

const ActionDataTable = ({ idPag, module, router, text }: IProps) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [open, setOpen] = useState(false);
	const targetRouter = router ?? pathname.split("/").filter(Boolean)[0];

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					size={!text ? "icon-sm" : "default"}
					variant="destructive"
					aria-label="Excluir registro"
				>
					<TrashIcon /> {text}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Exclusão de dados?</AlertDialogTitle>
					<AlertDialogDescription>
						{`Deseja excluir o item ${module}?`}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						disabled={!targetRouter}
						onClick={() => navigate(`/${targetRouter}/delete/${idPag}`)}
					>
						Excluir
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ActionDataTable;
