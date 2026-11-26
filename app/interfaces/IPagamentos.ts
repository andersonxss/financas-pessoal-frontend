export interface IPagamentos {
	id: string;
	name: string;
	status_id: string;
}

export interface IPagamentosForm {
	pagamento: IPagamentos;
	defaultValue: string;
}

export interface IPagamento {
	name: string;
	status_id: string;
}

export interface IformPagamento {
	defaultValues?: {
		name: string;
		status_id: string;
	};
}
