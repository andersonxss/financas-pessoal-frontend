import type {
	CategoriaDespesaAnual,
	CategoriaDespesaMensal,
	PagamentoDespesaAnual,
	RegistroFinanceiro,
	SerieMensal,
} from "@/interfaces";

export interface HomeDashboardData {
	ano: number;
	currentYear: number;
	despesas: RegistroFinanceiro[];
	receitas: SerieMensal[];
	saidas: SerieMensal[];
	categorias: CategoriaDespesaAnual[];
	categoriasMensais: CategoriaDespesaMensal[];
	pagamentos: PagamentoDespesaAnual[];
	unavailable: boolean;
}

export interface MonthlyDashboardEntry {
	id: number;
	mes: string;
	receita: number;
	despesa: number;
	saldo: number;
}

export interface DashboardSummary {
	income: number;
	expense: number;
	balance: number;
}

export interface ExpenseStatusSummary {
	total: number;
	paid: number;
	pending: number;
	other: number;
	paidPercent: number;
}

export interface CategoryExpenseSummary {
	items: CategoriaDespesaAnual[];
	total: number;
}

export interface MonthlyCategoryExpenseEntry {
	id: number;
	mes: string;
	[key: string]: number | string;
}

export interface MonthlyCategorySeries {
	id: string;
	name: string;
	total: number;
}

export interface MonthlyCategoryExpenseSummary {
	months: MonthlyCategoryExpenseEntry[];
	categories: MonthlyCategorySeries[];
}

export interface PaymentExpenseSummary {
	items: PagamentoDespesaAnual[];
	total: number;
}

export interface HomeDashboardViewModel {
	year: number;
	years: number[];
	months: MonthlyDashboardEntry[];
	hasData: boolean;
	summary: DashboardSummary;
	expenseStatus: ExpenseStatusSummary;
	categoryExpenses: CategoryExpenseSummary;
	monthlyCategoryExpenses: MonthlyCategoryExpenseSummary;
	paymentExpenses: PaymentExpenseSummary;
}
