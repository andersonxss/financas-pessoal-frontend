export interface IListDespesas {
	despesas: [];
}

export interface IDespesas {
	params: {
		id: string;
	};
}

export interface IPostDespesas {
	descricao: string;
	valor: number;
	categoria_id: string;
	parcela_id: string;
	pagamento_id: string;
	vencimento: string;
	status_id: string;
}

export interface IformGasto {
	method?: any;
	defaultValues?: {
		descricao: string;
		valor: number | undefined;
		categoria_id: string;
		parcela_id?: string | undefined;
		pagamento_id: string;
		vencimento?: string | Date | any;
	};
	categorias: [];
	parcelas: [];
	pagamentos: [];
}

interface FinancialProcessBase {
	clientId: string;
	descricao: string;
	valor: number;
	categoria_id: string;
	status_id: string;
	active: boolean;
	edit?: boolean;
}

export interface DespesaProcessItem extends FinancialProcessBase {
	tipo: "despesa";
	vencimento: string;
	pagamento_id: string;
	parcela_id: string;
	prazoInicio: number | null;
	prazoFim: number | null;
	tenant_id?: string;
}

export interface ReceitaProcessItem extends FinancialProcessBase {
	tipo: "receita";
	recebimento: string;
}

export type FinancialProcessItem = DespesaProcessItem | ReceitaProcessItem;

export type FinancialProcessSourceItem =
	| (Omit<DespesaProcessItem, "clientId" | "active"> & { active?: boolean })
	| (Omit<ReceitaProcessItem, "clientId" | "active"> & { active?: boolean });

export type FinancialProcessUpdate =
	| Partial<Omit<DespesaProcessItem, "clientId">>
	| Partial<Omit<ReceitaProcessItem, "clientId">>;

export interface DespesaProcessOption {
	id: string;
	name: string;
}

export interface DespesasProcessProps {
	despesas?: FinancialProcessSourceItem[];
	categorias?: DespesaProcessOption[];
	parcelas?: DespesaProcessOption[];
	pagamentos?: DespesaProcessOption[];
}
