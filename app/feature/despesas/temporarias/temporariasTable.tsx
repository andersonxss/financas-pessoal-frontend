"use client";
import {
	AlertCircle,
	CalendarDays,
	CheckCircle2,
	FileWarning,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { DespesasProcessProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { formatCurrency, formateDate } from "@/utils";
import useProcessData from "../hooks/useProcessData";
import SummaryValue from "./components/summaryValue";
import TemporariasTableHeader from "./components/temporariasTableHeader";
import TemporariasError from "./temporariasError";
import TemporariasSemDados from "./temporariasSemDados";
import TemporariosForms from "./temporariosForms";

interface ITemporariasTable {
	props: DespesasProcessProps;
}

const TemporariasTable = ({ props }: ITemporariasTable) => {
	const {
		despesas,
		categorias = [],
		parcelas = [],
		pagamentos = [],
	} = props ?? {};
	const { data, activeCount, checkItem, setItemActive, updateItem } =
		useProcessData(despesas);

	return (
		<section className="space-y-5" aria-labelledby="review-financial-title">
			<TemporariasTableHeader
				activeCount={activeCount}
				data={data}
				checkItem={checkItem}
			/>

			{checkItem && data.length > 0 && (
				<TemporariasError
					error="Selecione ao menos um lançamento e preencha os campos obrigatórios
						antes de processar."
				>
					<AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
				</TemporariasError>
			)}

			{data.length === 0 ? (
				<TemporariasSemDados
					title="Nenhum lançamento encontrado"
					text="Envie outro PDF ou verifique se o documento contém lançamentos de
						compras reconhecíveis."
				>
					<FileWarning
						className="text-muted-foreground size-10"
						aria-hidden="true"
					/>
				</TemporariasSemDados>
			) : (
				<div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
					{data.map((item, index) => {
						const switchId = `include-expense-${item.clientId}`;
						const dataLancamento =
							item.tipo === "receita" ? item.recebimento : item.vencimento;

						return (
							<Card
								key={item.clientId}
								className={cn(
									"gap-0 overflow-hidden border-green-500/70 py-0 transition-colors",
									!item.active && "border-red-500/70 bg-red-500/5",
								)}
							>
								<CardHeader className="border-b py-5">
									<div className="min-w-0 pr-3">
										<div className="flex flex-wrap items-center gap-2">
											<CardTitle
												className={cn(
													"break-words leading-5",
													!item.active && "text-muted-foreground line-through",
												)}
											>
												{item.descricao}
											</CardTitle>
											{item.edit && (
												<Badge variant="success">
													<CheckCircle2 aria-hidden="true" />
													Editado
												</Badge>
											)}
											<Badge variant={item.tipo === "receita" ? "secondary" : "success"}>
												{item.tipo === "receita" ? "Receita" : "Despesa"}
											</Badge>
										</div>
										<CardDescription className="mt-1.5 flex items-center gap-1.5">
											<CalendarDays className="size-4" aria-hidden="true" />
											{item.tipo === "receita" ? "Recebimento" : "Vencimento"}{" "}
											{formateDate(dataLancamento, "DD/MM/YYYY")}
										</CardDescription>
									</div>

									<CardAction className="flex items-center gap-2">
										<Label
											htmlFor={switchId}
											className="text-muted-foreground hidden text-xs sm:block"
										>
											{item.active ? "Incluído" : "Ignorado"}
										</Label>
										<Switch
											id={switchId}
											checked={item.active}
											aria-label={
												item.active
													? `Ignorar ${item.descricao}`
													: `Incluir ${item.descricao}`
											}
											onCheckedChange={(checked) =>
												setItemActive(index, checked)
											}
										/>
									</CardAction>
								</CardHeader>

								<CardContent className="space-y-5 py-5">
									<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
										<SummaryValue
											label="Valor"
											value={formatCurrency(item.valor)}
										/>
										{item.tipo === "despesa" && (
											<>
												<SummaryValue
													label="Parcela atual"
													value={item.prazoInicio?.toString() ?? "—"}
												/>
												<SummaryValue
													label="Total de parcelas"
													value={item.prazoFim?.toString() ?? "—"}
												/>
											</>
										)}
									</div>

									<div className="border-t pt-5">
										<TemporariosForms
											index={index}
											item={item}
											categorias={categorias}
											parcelas={parcelas}
											pagamentos={pagamentos}
											onUpdate={updateItem}
										/>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			)}
		</section>
	);
};

export default TemporariasTable;
