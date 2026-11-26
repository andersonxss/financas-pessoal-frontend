import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils";
import type { ExpenseStatusSummary } from "../home.types";

interface ExpenseStatusPanelProps {
	hasExpenses: boolean;
	status: ExpenseStatusSummary;
}

export function ExpenseStatusPanel({
	hasExpenses,
	status,
}: ExpenseStatusPanelProps) {
	return (
		<aside className="dashboard-aside" aria-label="Situação das despesas">
			<div>
				<h2>Contas sob controle</h2>
				<p className="dashboard-muted">Histórico completo · todos os anos</p>
			</div>
			{!hasExpenses ? (
				<p className="dashboard-muted py-6">
					Você ainda não tem despesas registradas. Seus pagamentos aparecerão
					aqui.
				</p>
			) : (
				<>
					<div className="dashboard-pending">
						<span>Em aberto</span>
						<strong>{formatCurrency(status.pending)}</strong>
						<p>
							{status.pending > 0
								? "Reserve espaço no orçamento para estes compromissos."
								: "Nenhuma despesa com status em aberto."}
						</p>
					</div>
					<div className="dashboard-payment">
						<div>
							<span>Despesas pagas</span>
							<strong>
								{status.paidPercent.toLocaleString("pt-BR", {
									maximumFractionDigits: 1,
								})}
								%
							</strong>
						</div>
						<div
							role="progressbar"
							aria-label="Percentual do valor das despesas pagas"
							aria-valuenow={Math.round(status.paidPercent)}
							aria-valuemin={0}
							aria-valuemax={100}
							className="dashboard-progress"
						>
							<span style={{ width: `${status.paidPercent}%` }} />
						</div>
					</div>
					<dl className="dashboard-breakdown">
						<div>
							<dt>Pagas</dt>
							<dd>{formatCurrency(status.paid)}</dd>
						</div>
						<div>
							<dt>Em aberto</dt>
							<dd>{formatCurrency(status.pending)}</dd>
						</div>
						{status.other > 0 && (
							<div>
								<dt>Outros status</dt>
								<dd>{formatCurrency(status.other)}</dd>
							</div>
						)}
						<div>
							<dt>Total registrado</dt>
							<dd>{formatCurrency(status.total)}</dd>
						</div>
					</dl>
				</>
			)}
			<Button asChild variant="outline" className="h-11 w-full">
				<Link to="/despesas">
					Ver minhas despesas
					<ArrowRight aria-hidden="true" />
				</Link>
			</Button>
		</aside>
	);
}
