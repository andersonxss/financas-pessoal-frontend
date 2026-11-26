import { useCallback, useEffect, useMemo, useState } from "react";
import type {
	FinancialProcessItem,
	FinancialProcessSourceItem,
	FinancialProcessUpdate,
} from "@/interfaces";

const isFinancialProcessSourceItem = (
	value: unknown,
): value is FinancialProcessSourceItem => {
	if (typeof value !== "object" || value === null || !("tipo" in value)) {
		return false;
	}

	return value.tipo === "despesa" || value.tipo === "receita";
};

const useProcessData = (lancamentos: unknown) => {
	const [data, setData] = useState<FinancialProcessItem[]>([]);

	useEffect(() => {
		if (!Array.isArray(lancamentos)) {
			setData([]);
			return;
		}

		setData(
			lancamentos.filter(isFinancialProcessSourceItem).map(
				(item) =>
					({
						...item,
						clientId: crypto.randomUUID(),
						active: item.active !== false,
					}) as FinancialProcessItem,
			),
		);
	}, [lancamentos]);

	const setItemActive = useCallback((index: number, active: boolean) => {
		setData((currentData) =>
			currentData.map((item, itemIndex) =>
				itemIndex === index ? { ...item, active } : item,
			),
		);
	}, []);

	const updateItem = useCallback(
		(index: number, changes: FinancialProcessUpdate) => {
			setData((currentData) =>
				currentData.map((item, itemIndex) =>
					itemIndex === index
						? ({ ...item, ...changes } as FinancialProcessItem)
						: item,
				),
			);
		},
		[],
	);

	const activeCount = useMemo(
		() => data.filter((item) => item.active).length,
		[data],
	);

	const checkItem = useMemo(() => {
		const activeItems = data.filter((item) => item.active);

		if (activeItems.length === 0) {
			return true;
		}

		return activeItems.some((item) => {
			const hasInvalidBaseData =
				!item.descricao?.trim() ||
				!Number.isFinite(Number(item.valor)) ||
				!item.categoria_id ||
				!item.status_id;

			if (hasInvalidBaseData) {
				return true;
			}

			return item.tipo === "receita"
				? !item.recebimento || Number(item.valor) <= 0
				: !item.vencimento || !item.pagamento_id || !item.parcela_id;
		});
	}, [data]);

	return {
		data,
		activeCount,
		setItemActive,
		updateItem,
		checkItem,
	};
};

export default useProcessData;
