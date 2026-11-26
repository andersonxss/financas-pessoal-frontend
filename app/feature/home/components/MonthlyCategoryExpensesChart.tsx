import { ArrowRight, Tags } from "lucide-react";
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
import type { MonthlyCategoryExpenseSummary } from "../home.types";

const categoryColors = [
	"#ff6584",
	"#8cab15",
	"#4f7fc9",
	"#e69124",
	"#8b63b8",
	"#168c84",
	"#c14f91",
	"#64748b",
];

function getCategoryColor(index: number) {
	return (
		categoryColors[index] ??
		`hsl(${Math.round((index * 137.508) % 360)} 58% 45%)`
	);
}

const compactNumberFormatter = new Intl.NumberFormat("pt-BR", {
	notation: "compact",
	maximumFractionDigits: 1,
});

interface MonthlyCategoryExpensesChartProps {
	year: number;
	summary: MonthlyCategoryExpenseSummary;
}

export function MonthlyCategoryExpensesChart({
	year,
	summary,
}: MonthlyCategoryExpensesChartProps) {
	const hasData = summary.categories.length > 0;
	const series = summary.categories.map((category, index) => ({
		...category,
		color: getCategoryColor(index),
	}));
	const chartConfig: ChartConfig = Object.fromEntries(
		series.map((category) => [
			category.id,
			{ label: category.name, color: category.color },
		]),
	);

	return (
		<Card className="dashboard-category-monthly-chart">
			<CardHeader>
				<div className="dashboard-section-heading">
					<h2>Gastos por categoria por mês</h2>
					<span className="dashboard-year">{year}</span>
				</div>
				<CardDescription>
					Acompanhe como cada categoria compôs suas despesas ao longo do ano.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{hasData ? (
					<>
						<ul
							className="dashboard-category-legend"
							aria-label="Legenda das categorias"
						>
							{series.map((category) => (
								<li key={category.id} title={category.name}>
									<i style={{ backgroundColor: category.color }} />
									{category.name}
								</li>
							))}
						</ul>
						<ChartContainer
							config={chartConfig}
							className="h-72 w-full min-w-0 sm:h-80"
							aria-label={`Gastos mensais por categoria em ${year}. Valores detalhados na tabela abaixo.`}
						>
							<BarChart
								data={summary.months}
								accessibilityLayer
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
											labelFormatter={(_label, payload) =>
												String(payload[0]?.payload?.mes ?? "")
											}
											formatter={(value, name) => (
												<div className="flex w-full items-center justify-between gap-4">
													<span>
														{String(chartConfig[String(name)]?.label ?? name)}
													</span>
													<strong>{formatCurrency(Number(value))}</strong>
												</div>
											)}
										/>
									}
								/>
								{series.map((category) => (
									<Bar
										key={category.id}
										dataKey={category.id}
										name={category.id}
										stackId="categories"
										fill={category.color}
										radius={[2, 2, 0, 0]}
										maxBarSize={26}
										isAnimationActive={false}
									/>
								))}
							</BarChart>
						</ChartContainer>
						<details className="dashboard-details">
							<summary>Consultar gastos por categoria e mês</summary>
							<div className="overflow-x-auto">
								<table>
									<caption className="sr-only">
										Gastos mensais por categoria em {year}, em reais
									</caption>
									<thead>
										<tr>
											<th scope="col">Mês</th>
											<th scope="col">Categoria</th>
											<th scope="col">Total</th>
										</tr>
									</thead>
									<tbody>
										{summary.months.flatMap((month) =>
											series.map((category) => {
												const total = Number(month[category.id] ?? 0);

												return total > 0 ? (
													<tr key={`${month.id}-${category.id}`}>
														<th scope="row">{month.mes}</th>
														<td>{category.name}</td>
														<td>{formatCurrency(total)}</td>
													</tr>
												) : null;
											}),
										)}
									</tbody>
								</table>
							</div>
						</details>
					</>
				) : (
					<div className="dashboard-empty dashboard-category-empty">
						<Tags aria-hidden="true" className="size-8" />
						<h3>Nenhum gasto categorizado em {year}.</h3>
						<p>
							Quando houver despesas no período, a evolução mensal por categoria
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
