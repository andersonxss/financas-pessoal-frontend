import { ArrowRight, CreditCard } from "lucide-react";
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
import type { PaymentExpenseSummary } from "../home.types";

const chartConfig = {
	total: { label: "Gastos", color: "var(--dashboard-expense)" },
} satisfies ChartConfig;

const compactNumberFormatter = new Intl.NumberFormat("pt-BR", {
	notation: "compact",
	maximumFractionDigits: 1,
});

function shortenPaymentName(name: string) {
	return name.length > 18 ? `${name.slice(0, 17)}…` : name;
}

export function PaymentMethodExpensesChart({
	year,
	summary,
}: {
	year: number;
	summary: PaymentExpenseSummary;
}) {
	const chartHeight = Math.max(230, summary.items.length * 46);

	return (
		<Card className="dashboard-payment-chart">
			<CardHeader>
				<div className="dashboard-section-heading">
					<div className="dashboard-category-heading-copy">
						<h2>Gastos por forma de pagamento</h2>
						<CardDescription>
							Distribuição das despesas em {year} por tipo de pagamento.
						</CardDescription>
					</div>
					<div className="dashboard-category-total">
						<span>Total do ano</span>
						<strong>{formatCurrency(summary.total)}</strong>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{summary.items.length > 0 ? (
					<>
						<ChartContainer
							config={chartConfig}
							className="w-full min-w-0"
							style={{ height: chartHeight }}
							aria-label={`Gastos por forma de pagamento em ${year}. Valores detalhados na tabela abaixo.`}
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
									dataKey="pagamento"
									tickLine={false}
									axisLine={false}
									width={132}
									tickFormatter={shortenPaymentName}
								/>
								<ChartTooltip
									cursor={{ fill: "var(--dashboard-hover)" }}
									content={
										<ChartTooltipContent
											hideLabel
											formatter={(value, _name, item) => (
												<div className="flex min-w-48 items-center justify-between gap-4">
													<span>{String(item.payload.pagamento)}</span>
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
							<summary>Consultar totais por forma de pagamento</summary>
							<div className="overflow-x-auto">
								<table>
									<caption className="sr-only">
										Gastos por forma de pagamento em {year}, em reais
									</caption>
									<thead>
										<tr>
											<th scope="col">Forma de pagamento</th>
											<th scope="col">Total</th>
											<th scope="col">Participação</th>
										</tr>
									</thead>
									<tbody>
										{summary.items.map((item) => (
											<tr key={item.pagamento_id}>
												<th scope="row">{item.pagamento}</th>
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
					<div className="dashboard-empty dashboard-payment-empty">
						<CreditCard aria-hidden="true" className="size-8" />
						<h3>Nenhum gasto por pagamento em {year}.</h3>
						<p>
							Quando houver despesas no período, a distribuição por forma de
							pagamento aparecerá aqui.
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
