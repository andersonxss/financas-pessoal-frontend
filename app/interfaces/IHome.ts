export interface RegistroFinanceiro {
	valor?: number | string | null;
	status_id?: string | null;
}

export interface SerieMensal {
	month?: number | string | null;
	total?: number | string | null;
}

export interface CategoriaDespesaAnual {
	categoria_id: string;
	categoria: string;
	total: number;
}

export interface CategoriaDespesaMensal extends CategoriaDespesaAnual {
	month: number;
}

export interface PagamentoDespesaAnual {
	pagamento_id: string;
	pagamento: string;
	total: number;
}

export interface LoadDataHome {
	ano: number;
	despesas: RegistroFinanceiro[];
	receitasSomaTotalMeses: SerieMensal[];
	despesasSomaTotalMeses: SerieMensal[];
}
