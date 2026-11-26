import { useCallback, useState } from "react";
import { somaDespesaAberto, somaDespesaPago, somaDespesaTotal } from "@/utils";
interface IpropsReceitas {
	receitasTotal: number;
	receitasAberta: number;
	receitasPaga: number;
}

const valorInitialSomaDespesas: IpropsReceitas = {
	receitasTotal: 0,
	receitasAberta: 0,
	receitasPaga: 0,
};
export const useSomaReitasHooks = () => {
	const [valueSomaReceitas, setValueSomaReceitas] = useState<IpropsReceitas>(
		valorInitialSomaDespesas,
	);

	const renderUpdateValorReceitas = useCallback((list: any[]) => {
		const despesavalorTotal = somaDespesaTotal(list);
		const despesavalorTotalAberto = somaDespesaAberto(list);
		const despesavalorTotalPago = somaDespesaPago(list);
		setValueSomaReceitas((e: IpropsReceitas) => ({
			...e,
			receitasTotal: despesavalorTotal,
			receitasAberta: despesavalorTotalAberto,
			receitasPaga: despesavalorTotalPago,
		}));
	}, []);

	return { valueSomaReceitas, renderUpdateValorReceitas };
};
