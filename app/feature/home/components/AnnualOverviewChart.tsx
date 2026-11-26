import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/utils";
import type { MonthlyDashboardEntry } from "../home.types";

const chartConfig = {
	receita: { label: "Receitas", color: "var(--dashboard-income)" },
	despesa: { label: "Despesas", color: "var(--dashboard-expense)" },
} satisfies ChartConfig;

const compactNumberFormatter = new Intl.NumberFormat("pt-BR", {
	notation: "compact",
	maximumFractionDigits: 1,
});

interface AnnualOverviewChartProps {
	year: number;
	months: MonthlyDashboardEntry[];
	hasData: boolean;
}

export function AnnualOverviewChart({
	year,
	months,
	hasData,
}: AnnualOverviewChartProps) {
	return (
		<Card className="dashboard-chart">
			<CardHeader>
				<div className="dashboard-section-heading">
					<h2>O ritmo do seu ano</h2>
					<span className="dashboard-year">{year}</span>
				</div>
				<CardDescription>
					Compare receitas e despesas, mês a mês.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="dashboard-legend">
					<span>
						<i className="legend-income" />
						Receitas
					</span>
					<span>
						<i className="legend-expense" />
						Despesas
					</span>
				</div>
				{hasData ? (
					<>
						<ChartContainer
							config={chartConfig}
							className="h-72 w-full min-w-0 sm:h-80"
							aria-label={`Receitas e despesas mensais de ${year}. Valores detalhados na tabela abaixo.`}
						>
							<BarChart
								data={months}
								accessibilityLayer
								barGap={3}
								margin={{ top: 16, right: 4, left: -12, bottom: 0 }}
							>
								<CartesianGrid vertical={false} strokeDasharray="3 5" />
								<XAxis
									dataKey="mes"
									tickLine={false}
									axisLine={false}
									tickMargin={12}
									minTickGap={14}
									tickFormatter={(value: string) => value.slice(0, 3)}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									width={62}
									tickFormatter={(value: number) =>
										compactNumberFormatter.format(value)
									}
								/>
								<ChartTooltip
									cursor={{ fill: "var(--dashboard-hover)" }}
									content={
										<ChartTooltipContent
											formatter={(value, name) => (
												<div className="flex w-full items-center justify-between gap-4">
													<span>
														{name === "receita" ? "Receitas" : "Despesas"}
													</span>
													<strong>{formatCurrency(Number(value))}</strong>
												</div>
											)}
										/>
									}
								/>
								<Bar
									dataKey="receita"
									fill="var(--color-receita)"
									radius={[3, 3, 0, 0]}
									maxBarSize={18}
									isAnimationActive={false}
								/>
								<Bar
									dataKey="despesa"
									fill="var(--color-despesa)"
									radius={[3, 3, 0, 0]}
									maxBarSize={18}
									isAnimationActive={false}
								/>
							</BarChart>
						</ChartContainer>
						<details className="dashboard-details">
							<summary>Consultar valores por mês</summary>
							<div className="overflow-x-auto">
								<table>
									<caption className="sr-only">
										Valores mensais de {year}, em reais
									</caption>
									<thead>
										<tr>
											<th scope="col">Mês</th>
											<th scope="col">Receitas</th>
											<th scope="col">Despesas</th>
											<th scope="col">Saldo</th>
										</tr>
									</thead>
									<tbody>
										{months.map((month) => (
											<tr key={month.id}>
												<th scope="row">{month.mes}</th>
												<td>{formatCurrency(month.receita)}</td>
												<td>{formatCurrency(month.despesa)}</td>
												<td>{formatCurrency(month.saldo)}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</details>
					</>
				) : (
					<div className="dashboard-empty">
						<CalendarDays aria-hidden="true" className="size-8" />
						<h3>Seu ano começa com um registro.</h3>
						<p>
							Nenhuma receita ou despesa encontrada em {year}. Escolha outro ano
							ou registre sua primeira movimentação.
						</p>
						<Button asChild variant="outline" className="h-11">
							<Link to="/receitas/create">
								Registrar receita
								<ArrowRight aria-hidden="true" />
							</Link>
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
