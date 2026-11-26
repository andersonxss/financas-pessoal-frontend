import { ArrowDownLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { formatCurrency } from "@/utils";
import type { DashboardSummary } from "../home.types";

function getFinancialReading(
	hasData: boolean,
	{ income, balance }: DashboardSummary,
) {
	if (!hasData) {
		return "Quando houver movimentações, você poderá acompanhar aqui a relação entre suas receitas e despesas.";
	}

	if (income === 0) {
		return "Há despesas registradas, mas nenhuma receita neste ano. Registre suas entradas para completar a visão do período.";
	}

	if (balance >= 0) {
		return `As receitas superam as despesas em ${formatCurrency(balance)} no ano. Os valores incluem todas as movimentações registradas, independentemente do status de pagamento.`;
	}

	return `As despesas superam as receitas em ${formatCurrency(Math.abs(balance))} no ano. Revise seus lançamentos para entender o que mais pesa no orçamento.`;
}

export function DashboardInsights({
	hasData,
	summary,
}: {
	hasData: boolean;
	summary: DashboardSummary;
}) {
	return (
		<section
			className="dashboard-bottom"
			aria-label="Leitura do período e atalhos"
		>
			<div className="dashboard-reading">
				<h2>O que os números dizem</h2>
				<p>{getFinancialReading(hasData, summary)}</p>
			</div>
			<nav aria-label="Atalhos financeiros" className="dashboard-shortcuts">
				<Link to="/receitas">
					<ArrowDownLeft aria-hidden="true" />
					<span>
						Explorar receitas<small>Acompanhe suas entradas</small>
					</span>
					<ArrowRight aria-hidden="true" />
				</Link>
				<Link to="/despesas">
					<ArrowUpRight aria-hidden="true" />
					<span>
						Explorar despesas<small>Revise suas movimentações</small>
					</span>
					<ArrowRight aria-hidden="true" />
				</Link>
			</nav>
		</section>
	);
}
