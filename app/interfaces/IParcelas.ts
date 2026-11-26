export interface IParcelas {
	id: string;
	name: string;
	status_id: string;
}

export interface IParcelasForm {
	parcela: IParcelas;
	defaultValue: string;
}

export interface IParcela {
	name: string;
	status_id: string;
}

export interface IformParcela {
	defaultValues?: IParcela;
}
