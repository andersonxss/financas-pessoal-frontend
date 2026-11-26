import { useParams } from "react-router";
import { meses } from "@/constants";

const useSelectAnoMeses = () => {
	const { ano: anoParam, mes: mesParam } = useParams();
	const dataAtual = new Date();
	const anoUrl = Number(anoParam);
	const mesUrl = Number(mesParam);
	const mesUrlIndex = meses.findIndex((mes) => mes.id === mesUrl);
	const ano = Number.isInteger(anoUrl) ? anoUrl : dataAtual.getFullYear();
	const countMeses = mesUrlIndex >= 0 ? mesUrlIndex : dataAtual.getMonth();

	return {
		ano,
		countMeses,
	};
};

export default useSelectAnoMeses;
