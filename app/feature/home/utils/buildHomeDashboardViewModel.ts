import { STATUS_ABERTO_ID, STATUS_PAGO_ID } from "../home.constants";
import type { HomeDashboardData, HomeDashboardViewModel } from "../home.types";
import { buildMonthlyCategorySeries } from "./buildMonthlyCategorySeries";
import { buildMonthlySeries } from "./buildMonthlySeries";
import { sumByStatus } from "./sumByStatus";
import { sumValues } from "./sumValues";
import { toNumber } from "./toNumber";

function buildYearOptions(selectedYear: number, currentYear: number) {
	return Array.from(
		new Set([
			selectedYear,
			...Array.from(
				{ length: currentYear - 1999 },
				(_, index) => currentYear - index,
			),
		]),
	).sort((first, second) => second - first);
}

export function buildHomeDashboardViewModel(
	data: HomeDashboardData,
): HomeDashboardViewModel {
	const months = buildMonthlySeries(data.receitas, data.saidas);
	const income = months.reduce((total, month) => total + month.receita, 0);
	const expense = months.reduce((total, month) => total + month.despesa, 0);
	const total = sumValues(data.despesas);
	const paid = sumByStatus(data.despesas, STATUS_PAGO_ID);
	const pending = sumByStatus(data.despesas, STATUS_ABERTO_ID);
	const paidPercent =
		total > 0 ? Math.min(100, Math.max(0, (paid / total) * 100)) : 0;
	const categoryItems = data.categorias
		.map((item) => ({ ...item, total: toNumber(item.total) }))
		.filter((item) => item.total > 0)
		.sort((first, second) => second.total - first.total);
	const paymentItems = data.pagamentos
		.map((item) => ({ ...item, total: toNumber(item.total) }))
		.filter((item) => item.total > 0)
		.sort((first, second) => second.total - first.total);
	const monthlyCategoryExpenses = buildMonthlyCategorySeries(
		data.categoriasMensais,
	);

	return {
		year: data.ano,
		years: buildYearOptions(data.ano, data.currentYear),
		months,
		hasData: months.some((month) => month.receita !== 0 || month.despesa !== 0),
		summary: {
			income,
			expense,
			balance: income - expense,
		},
		expenseStatus: {
			total,
			paid,
			pending,
			other: Math.max(0, total - paid - pending),
			paidPercent,
		},
		categoryExpenses: {
			items: categoryItems,
			total: categoryItems.reduce((sum, item) => sum + item.total, 0),
		},
		monthlyCategoryExpenses,
		paymentExpenses: {
			items: paymentItems,
			total: paymentItems.reduce((sum, item) => sum + item.total, 0),
		},
	};
}
