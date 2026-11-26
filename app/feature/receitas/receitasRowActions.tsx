import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";
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
import { Switch } from "@/components/ui/switch";
import {
	statusAberto,
	statusAbertoId,
	statusPago,
	statusPagoId,
} from "@/constants/tipoStatus";
import type { IReceitas, IReceitasActionData } from "@/interfaces/IReceitas";

function useMutationFeedback(data: IReceitasActionData | undefined) {
	useEffect(() => {
		if (data?.formSuccess) toast.success(data.formSuccess);
		if (data?.formError) toast.error(data.formError);
	}, [data]);
}

export function ReceitaStatusAction({ receita }: { receita: IReceitas }) {
	const fetcher = useFetcher<IReceitasActionData>();
	const statusName = receita.status?.name;
	const checked = statusName === statusPago;
	const nextStatusId =
		statusName === statusAberto ? statusPagoId : statusAbertoId;
	const pending = fetcher.state !== "idle";
	useMutationFeedback(fetcher.data);

	if (!statusName) return null;

	return (
		<Switch
			checked={checked}
			disabled={pending}
			aria-label={
				checked ? "Marcar receita como aberta" : "Marcar receita como paga"
			}
			onCheckedChange={() =>
				fetcher.submit(null, {
					method: "put",
					action: `/receitas/status/${receita.id}/${nextStatusId}`,
				})
			}
		/>
	);
}

export function ReceitaDeleteAction({ receitaId }: { receitaId: string }) {
	const fetcher = useFetcher<IReceitasActionData>();
	const [open, setOpen] = useState(false);
	const pending = fetcher.state !== "idle";
	useMutationFeedback(fetcher.data);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					type="button"
					size="icon-sm"
					variant="destructive"
					aria-label="Excluir receita"
				>
					<TrashIcon />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Excluir receita?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta ação removerá a receita permanentemente.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						disabled={pending}
						onClick={() => {
							fetcher.submit(null, {
								method: "delete",
								action: `/receitas/delete/${receitaId}`,
							});
							setOpen(false);
						}}
					>
						{pending ? "Excluindo..." : "Excluir"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
