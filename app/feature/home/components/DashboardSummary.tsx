import { formatCurrency } from "@/utils";
import type { DashboardSummary as DashboardSummaryData } from "../home.types";

type MetricTone = "income" | "expense" | "neutral";

interface MetricProps {
	label: string;
	value: number;
	note: string;
	tone: MetricTone;
}

function Metric({ label, value, note, tone }: MetricProps) {
	return (
		<div className={`dashboard-metric dashboard-${tone}`}>
			<h2>{label}</h2>
			<p>{formatCurrency(value)}</p>
			<span>{note}</span>
		</div>
	);
}

export function DashboardSummary({
	year,
	summary,
}: {
	year: number;
	summary: DashboardSummaryData;
}) {
	return (
		<section aria-label={`Resumo de ${year}`} className="dashboard-summary">
			<Metric
				label="Saldo do ano"
				value={summary.balance}
				note="Receitas menos despesas; não é saldo bancário"
				tone="neutral"
			/>
			<Metric
				label="Receitas do ano"
				value={summary.income}
				note="Entradas registradas"
				tone="income"
			/>
			<Metric
				label="Despesas do ano"
				value={summary.expense}
				note="Saídas registradas"
				tone="expense"
			/>
		</section>
	);
}
