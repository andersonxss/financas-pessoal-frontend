import { Files, PlusIcon, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
	ActionContainerButton,
	ActionDataTable,
	ActionEditButton,
	ButtonActionUpdateState,
	CardResultados,
	Cards,
	DataTable,
	SelectAnoMeses,
	StatusCustom,
} from "@/components";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSomaDespesasHooks } from "@/hooks";
import type { IListDespesas } from "@/interfaces";
import { formatCurrency, formateDate, progressParcelas } from "@/utils";

const ALL_FILTER_VALUE = "__all__";

interface DespesaFilterItem {
	categoria?: { name?: string };
	pagamento?: { name?: string };
}

const uniqueSortedNames = (names: Array<string | undefined>) =>
	Array.from(
		new Set(names.filter((name): name is string => Boolean(name))),
	).sort((a, b) => a.localeCompare(b, "pt-BR"));

const DespesasTable = ({ despesas }: IListDespesas) => {
	const [categoriaFilter, setCategoriaFilter] = useState(ALL_FILTER_VALUE);
	const [tipoFilter, setTipoFilter] = useState(ALL_FILTER_VALUE);
	const { valueSomaDespesa, renderUpdateValorDespesas } =
		useSomaDespesasHooks();
	const despesasList = despesas as DespesaFilterItem[];

	const categorias = useMemo(
		() =>
			uniqueSortedNames(despesasList.map((despesa) => despesa.categoria?.name)),
		[despesasList],
	);

	const tipos = useMemo(
		() =>
			uniqueSortedNames(despesasList.map((despesa) => despesa.pagamento?.name)),
		[despesasList],
	);

	const despesasFiltradas = useMemo(
		() =>
			despesasList.filter((despesa) => {
				const correspondeCategoria =
					categoriaFilter === ALL_FILTER_VALUE ||
					despesa.categoria?.name === categoriaFilter;
				const correspondeTipo =
					tipoFilter === ALL_FILTER_VALUE ||
					despesa.pagamento?.name === tipoFilter;

				return correspondeCategoria && correspondeTipo;
			}),
		[despesasList, categoriaFilter, tipoFilter],
	);

	const headerTableDespesas = useMemo(
		() => [
			{
				accessorKey: "descricao",
				header: "Descrição",
			},
			{
				accessorKey: "valor",
				header: "Valor",
				style: { minWidth: "100px" },
				className: "text-center",
				cell: ({ getValue }: any) => {
					const data = getValue("valor");
					return formatCurrency(data);
				},
			},
			{
				accessorKey: "vencimento",
				header: "Vencimento",
				style: { minWidth: "100px" },
				className: "text-center",
				cell: (rowData: any) => {
					return formateDate(rowData.vencimento, "DD/MM/YYYY");
				},
			},
			{
				accessorKey: "categoria.name",
				header: "Categoria",
				className: "text-center",
			},
			{
				accessorKey: "pagamento.name",
				header: "Tipo",
				className: "text-center",
			},
			{
				accessorKey: "parcela.name",
				header: "Parcela",
				className: "text-center flex justify-center items-center p-4",
				cell: ({ row, getValue }: any) => {
					const { descricao } = row.original;
					const data = getValue("parcela");
					const progress = progressParcelas(descricao);
					return (
						<div
							className={`${progress?.color} border-2 ${progress?.bg} rounded-full  w-6 h-6`}
						>
							{data}
						</div>
					);
				},
			},
			{
				accessorKey: "status.name",
				header: "Status",
				className: "text-center",
				cell: ({ getValue }: any) => {
					const data = getValue("status");
					return <StatusCustom status={data} />;
				},
			},
			{
				header: "Ação",
				className: "text-center w-24",
				cell: ({ row }: any) => {
					const { id, status } = row.original;
					return (
						<ActionContainerButton>
							<ButtonActionUpdateState
								id={id}
								name={status?.name}
								route="despesas"
							/>
							<ActionEditButton idPag={id} route="despesas" />

							<ActionDataTable
								idPag={id}
								module="de dados das despesas temporário."
								router="despesas"
							/>
						</ActionContainerButton>
					);
				},
			},
		],
		[],
	);

	useEffect(() => {
		renderUpdateValorDespesas(despesasFiltradas);
	}, [despesasFiltradas, renderUpdateValorDespesas]);

	return (
		<>
			<ButtonGroup
				aria-label="Ações de despesas"
				className="ml-auto mb-3 flex-wrap justify-end"
			>
				<Button asChild>
					<Link to="/despesas/temporarias">
						<Files className="size-4" />
						Dados temporários
					</Link>
				</Button>
				<Button asChild>
					<Link to="/despesas/documentos">
						<Upload className="w-4 h-4" />
						Upload de documentos
					</Link>
				</Button>
				<Button asChild>
					<Link to="/despesas/create">
						<PlusIcon className="w-4 h-4" />
						Novo Registro
					</Link>
				</Button>
			</ButtonGroup>
			<Cards>
				<div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
					<CardResultados
						title="Total Despesas"
						value={valueSomaDespesa.despesaTotal}
						status={1}
					/>
					<CardResultados
						title="Despesas Pagas"
						value={valueSomaDespesa.despesaPaga}
						status={2}
					/>
					<CardResultados
						title="Despesas Pendentes"
						value={valueSomaDespesa.despesaAberta}
						status={3}
					/>
				</div>
				<div className="mb-4 flex w-full flex-col gap-3 lg:flex-row lg:items-end lg:justify-end">
					<div className="w-full lg:w-56">
						<label
							htmlFor="filtro-categoria-despesas"
							className="mb-1.5 block text-xs font-semibold text-muted-foreground"
						>
							Categoria
						</label>
						<Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
							<SelectTrigger id="filtro-categoria-despesas">
								<SelectValue placeholder="Todas as categorias" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value={ALL_FILTER_VALUE}>
										Todas as categorias
									</SelectItem>
									{categorias.map((categoria) => (
										<SelectItem key={categoria} value={categoria}>
											{categoria}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="w-full lg:w-56">
						<label
							htmlFor="filtro-tipo-despesas"
							className="mb-1.5 block text-xs font-semibold text-muted-foreground"
						>
							Tipo
						</label>
						<Select value={tipoFilter} onValueChange={setTipoFilter}>
							<SelectTrigger id="filtro-tipo-despesas">
								<SelectValue placeholder="Todos os tipos" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value={ALL_FILTER_VALUE}>
										Todos os tipos
									</SelectItem>
									{tipos.map((tipo) => (
										<SelectItem key={tipo} value={tipo}>
											{tipo}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="w-full lg:w-auto">
						<p className="mb-1.5 text-xs font-semibold text-muted-foreground">
							Período
						</p>
						<div className="overflow-x-auto pb-1 lg:pb-0">
							<SelectAnoMeses route="despesas" />
						</div>
					</div>
				</div>

				<DataTable
					columns={headerTableDespesas}
					data={despesasFiltradas}
					manualPagination={true}
				/>
			</Cards>
		</>
	);
};

export default DespesasTable;
