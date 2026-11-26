import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

type ButtonVoltarTelaProps = {
	to?: string;
};

const ButtonVoltarTela = ({ to }: ButtonVoltarTelaProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		if (to) {
			navigate(to);
			return;
		}

		navigate(-1);
	};

	return (
		<Button type="button" variant="secondary" onClick={handleClick}>
			Voltar
		</Button>
	);
};

export default ButtonVoltarTela;
