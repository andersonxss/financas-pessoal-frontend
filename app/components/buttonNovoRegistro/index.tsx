import { PlusIcon, Upload } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const ButtonNovoRegistro = ({
	to = "create",
	text = "Novo Registro",
	icon = "PlusIcon",
}: {
	to?: string;
	text?: string;
	icon?: string;
}) => {
	return (
		<div className="mb-4 flex w-full justify-end">
			<Button asChild>
				<Link to={to}>
					{icon === "PlusIcon" && <PlusIcon className="w-4 h-4" />}
					{icon === "Upload" && <Upload className="w-4 h-4" />}
					{text}
				</Link>
			</Button>
		</div>
	);
};

export default ButtonNovoRegistro;
