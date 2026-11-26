import { meses } from "@/constants";
import type { CategoriaDespesaMensal } from "@/interfaces";
import type {
	MonthlyCategoryExpenseSummary,
	MonthlyCategorySeries,
} from "../home.types";
import { toNumber } from "./toNumber";

export function buildMonthlyCategorySeries(
	items: CategoriaDespesaMensal[],
): MonthlyCategoryExpenseSummary {
	const totalsByCategory = new Map<string, MonthlyCategorySeries>();
	const valuesByMonth = new Map<number, Map<string, number>>();

	for (const item of items) {
		const month = Number(item.month);
		const total = toNumber(item.total);

		if (
			!item.categoria_id ||
			!item.categoria ||
			!Number.isInteger(month) ||
			month < 1 ||
			month > 12 ||
			total <= 0
		) {
			continue;
		}

		const category = totalsByCategory.get(item.categoria_id);
		totalsByCategory.set(item.categoria_id, {
			id: item.categoria_id,
			name: item.categoria,
			total: (category?.total ?? 0) + total,
		});

		const monthValues = valuesByMonth.get(month) ?? new Map<string, number>();
		monthValues.set(
			item.categoria_id,
			(monthValues.get(item.categoria_id) ?? 0) + total,
		);
		valuesByMonth.set(month, monthValues);
	}

	const categories = Array.from(totalsByCategory.values()).sort(
		(first, second) => second.total - first.total,
	);
	const months = meses.map((month) => {
		const entry: MonthlyCategoryExpenseSummary["months"][number] = {
			id: month.id,
			mes: month.name,
		};

		for (const [categoryId, total] of valuesByMonth.get(month.id) ?? []) {
			entry[categoryId] = total;
		}

		return entry;
	});

	return { months, categories };
}
