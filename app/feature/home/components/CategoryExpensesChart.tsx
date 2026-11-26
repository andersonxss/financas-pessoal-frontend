import { ArrowRight, Shapes } from "lucide-react";
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
import type { CategoryExpenseSummary } from "../home.types";

const chartConfig = {
	total: { label: "Gastos", color: "var(--dashboard-expense)" },
} satisfies ChartConfig;

const compactNumberFormatter = new Intl.NumberFormat("pt-BR", {
	notation: "compact",
	maximumFractionDigits: 1,
});

function shortenCategoryName(name: string) {
	return name.length > 18 ? `${name.slice(0, 17)}…` : name;
}

interface CategoryExpensesChartProps {
	year: number;
	summary: CategoryExpenseSummary;
}

export function CategoryExpensesChart({
	year,
	summary,
}: CategoryExpensesChartProps) {
	const hasCategories = summary.items.length > 0;
	const chartHeight = Math.max(260, summary.items.length * 46);

	return (
		<Card className="dashboard-category-chart">
			<CardHeader>
				<div className="dashboard-section-heading">
					<div className="dashboard-category-heading-copy">
						<h2>Gastos por categoria no ano</h2>
						<CardDescription>
							Veja quais áreas concentraram suas despesas em {year}.
						</CardDescription>
					</div>
					<div className="dashboard-category-total">
						<span>Total do ano</span>
						<strong>{formatCurrency(summary.total)}</strong>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{hasCategories ? (
					<>
						<ChartContainer
							config={chartConfig}
							className="w-full min-w-0"
							style={{ height: chartHeight }}
							aria-label={`Gastos por categoria em ${year}. Valores detalhados na tabela abaixo.`}
						>
							<BarChart
								data={summary.items}
								layout="vertical"
								accessibilityLayer
								margin={{ top: 8, right: 12, left: 8, bottom: 0 }}
							>
								<CartesianGrid horizontal={false} strokeDasharray="3 5" />
								<XAxis
									type="number"
									tickLine={false}
									axisLine={false}
									tickFormatter={(value: number) =>
										compactNumberFormatter.format(value)
									}
								/>
								<YAxis
									type="category"
									dataKey="categoria"
									tickLine={false}
									axisLine={false}
									width={132}
									tickFormatter={shortenCategoryName}
								/>
								<ChartTooltip
									cursor={{ fill: "var(--dashboard-hover)" }}
									content={
										<ChartTooltipContent
											hideLabel
											formatter={(value, _name, item) => (
												<div className="flex min-w-48 items-center justify-between gap-4">
													<span>{String(item.payload.categoria)}</span>
													<strong>{formatCurrency(Number(value))}</strong>
												</div>
											)}
										/>
									}
								/>
								<Bar
									dataKey="total"
									fill="var(--color-total)"
									radius={[0, 5, 5, 0]}
									maxBarSize={22}
									isAnimationActive={false}
								/>
							</BarChart>
						</ChartContainer>
						<details className="dashboard-details">
							<summary>Consultar totais por categoria</summary>
							<div className="overflow-x-auto">
								<table>
									<caption className="sr-only">
										Gastos por categoria em {year}, em reais
									</caption>
									<thead>
										<tr>
											<th scope="col">Categoria</th>
											<th scope="col">Total</th>
											<th scope="col">Participação</th>
										</tr>
									</thead>
									<tbody>
										{summary.items.map((item) => (
											<tr key={item.categoria_id}>
												<th scope="row">{item.categoria}</th>
												<td>{formatCurrency(item.total)}</td>
												<td>
													{summary.total > 0
														? `${((item.total / summary.total) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`
														: "0%"}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</details>
					</>
				) : (
					<div className="dashboard-empty dashboard-category-empty">
						<Shapes aria-hidden="true" className="size-8" />
						<h3>Nenhum gasto categorizado em {year}.</h3>
						<p>
							Quando houver despesas no período, a distribuição por categoria
							aparecerá aqui.
						</p>
						<Button asChild variant="outline" className="h-11">
							<Link to="/despesas/create">
								Registrar despesa
								<ArrowRight aria-hidden="true" />
							</Link>
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
