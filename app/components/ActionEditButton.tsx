import { PencilIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

interface IProps {
	idPag: string;
	route?: string;
}

const ActionEditButton = ({ idPag, route }: IProps) => {
	const navigate = useNavigate();
	const target = route ? `/${route}/edit/${idPag}` : `edit/${idPag}`;
	return (
		<Button
			type="button"
			size="icon-sm"
			variant="secondary"
			aria-label="Editar registro"
			onClick={() => navigate(target)}
		>
			<PencilIcon />
		</Button>
	);
};

export default ActionEditButton;
