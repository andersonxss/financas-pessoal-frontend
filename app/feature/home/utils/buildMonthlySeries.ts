import { meses } from "@/constants";
import type { SerieMensal } from "@/interfaces";
import type { MonthlyDashboardEntry } from "../home.types";
import { toNumber } from "./toNumber";

export function buildMonthlySeries(
	receitas: SerieMensal[],
	despesas: SerieMensal[],
): MonthlyDashboardEntry[] {
	return meses.map((mes) => {
		const receitaMes = receitas.find(
			(item) => Number(item.month) === Number(mes.id),
		);
		const despesaMes = despesas.find(
			(item) => Number(item.month) === Number(mes.id),
		);

		const receita = toNumber(receitaMes?.total);
		const despesa = toNumber(despesaMes?.total);

		return {
			id: mes.id,
			mes: mes.name,
			receita,
			despesa,
			saldo: receita - despesa,
		};
	});
}
