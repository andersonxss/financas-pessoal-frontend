import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

const ContainerButton = ({
	isSubmitting = false,
}: {
	isSubmitting?: boolean;
}) => {
	return (
		<DialogFooter>
			<DialogClose asChild>
				<Button type="button" variant="secondary">
					Fechar
				</Button>
			</DialogClose>
			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Salvando..." : "Salvar"}
			</Button>
		</DialogFooter>
	);
};

export default ContainerButton;
