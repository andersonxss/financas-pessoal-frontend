import { useCallback, useState } from "react";
import { somaDespesaAberto, somaDespesaPago, somaDespesaTotal } from "@/utils";

interface IpropsDespesas {
	despesaTotal: number;
	despesaAberta: number;
	despesaPaga: number;
}

const valorInitialSomaDespesas: IpropsDespesas = {
	despesaTotal: 0,
	despesaAberta: 0,
	despesaPaga: 0,
};

export const useSomaDespesasHooks = () => {
	const [valueSomaDespesa, setValueSomaDespesa] = useState<IpropsDespesas>(
		valorInitialSomaDespesas,
	);

	const renderUpdateValorDespesas = useCallback((list: any[]) => {
		const despesavalorTotal = somaDespesaTotal(list);
		const despesavalorTotalAberto = somaDespesaAberto(list);
		const despesavalorTotalPago = somaDespesaPago(list);
		setValueSomaDespesa((e: IpropsDespesas) => ({
			...e,
			despesaTotal: despesavalorTotal,
			despesaAberta: despesavalorTotalAberto,
			despesaPaga: despesavalorTotalPago,
		}));
	}, []);

	return { valueSomaDespesa, renderUpdateValorDespesas };
};
