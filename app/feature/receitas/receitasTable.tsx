import type { ColumnDef } from "@tanstack/react-table";
import { type CSSProperties, useEffect, useMemo } from "react";
import {
	ActionContainerButton,
	ActionEditButton,
	ButtonNovoRegistro,
	CardResultados,
	Cards,
	DataTable,
	SelectAnoMeses,
	StatusCustom,
} from "@/components";
import { useSomaReitasHooks } from "@/hooks";
import type { IReceitas } from "@/interfaces/IReceitas";
import { formatCurrency, formateDate } from "@/utils";
import { ReceitaDeleteAction, ReceitaStatusAction } from "./receitasRowActions";

type TableColumn = ColumnDef<IReceitas> & {
	className?: string;
	style?: CSSProperties;
};

interface ReceitasTableProps {
	receitas: IReceitas[];
	loadError?: string;
}

export default function ReceitasTable({
	receitas,
	loadError,
}: ReceitasTableProps) {
	const { valueSomaReceitas, renderUpdateValorReceitas } = useSomaReitasHooks();
	const columns = useMemo<TableColumn[]>(
		() => [
			{
				accessorKey: "descricao",
				header: "Descrição",
			},
			{
				accessorKey: "valor",
				header: "Valor",
				className: "text-center",
				style: { minWidth: "100px" },
				cell: ({ getValue }) => formatCurrency(Number(getValue())),
			},
			{
				accessorKey: "recebimento",
				header: "Recebimento",
				className: "text-center",
				style: { minWidth: "120px" },
				cell: ({ getValue }) => formateDate(String(getValue()), "DD/MM/YYYY"),
			},
			{
				id: "categoria",
				accessorFn: (receita) => receita.categoria?.name ?? "",
				header: "Categoria",
				className: "text-center",
			},
			{
				id: "status",
				accessorFn: (receita) => receita.status?.name ?? "",
				header: "Status",
				className: "text-center",
				cell: ({ getValue }) => <StatusCustom status={String(getValue())} />,
			},
			{
				id: "actions",
				header: "Ação",
				className: "text-center w-36",
				cell: ({ row }) => (
					<ActionContainerButton>
						<ReceitaStatusAction receita={row.original} />
						<ActionEditButton idPag={row.original.id} route="receitas" />
						<ReceitaDeleteAction receitaId={row.original.id} />
					</ActionContainerButton>
				),
			},
		],
		[],
	);

	useEffect(() => {
		renderUpdateValorReceitas(receitas);
	}, [receitas, renderUpdateValorReceitas]);

	return (
		<>
			<ButtonNovoRegistro to="/receitas/create" text="Novo Registro" />
			<Cards>
				<div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
					<CardResultados
						title="Total Receitas"
						value={valueSomaReceitas.receitasTotal}
						status={1}
					/>
					<CardResultados
						title="Receitas Recebidas"
						value={valueSomaReceitas.receitasPaga}
						status={2}
					/>
					<CardResultados
						title="Receitas Pendentes"
						value={valueSomaReceitas.receitasAberta}
						status={3}
					/>
				</div>
				{loadError && (
					<div
						role="alert"
						className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm"
					>
						<p className="font-semibold">Receitas indisponíveis</p>
						<p className="mt-1">{loadError}</p>
					</div>
				)}

				<div className="mb-4 flex w-full justify-end">
					<SelectAnoMeses route="receitas" />
				</div>
				<DataTable columns={columns} data={receitas} manualPagination={true} />
			</Cards>
		</>
	);
}
