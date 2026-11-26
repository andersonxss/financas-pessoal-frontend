import type { ICategorias } from "./ICategorias";
import type { IStatus } from "./IStatus";

export interface IReceitas {
	id: string;
	descricao: string;
	valor: number;
	recebimento: string;
	categoria_id: string;
	status_id: string;
	categoria?: ICategorias;
	status?: IStatus;
	created_at?: string;
	updated_at?: string;
}

export interface IListReceitas {
	receitas: IReceitas[];
}

export interface IReceitasLoaderData extends IListReceitas {
	loadError?: string;
}

export interface IPostReceitas {
	descricao: string;
	valor: number;
	categoria_id: string;
	recebimento: string;
	status_id: string;
}

export interface IReceitasFormValues {
	[key: string]: string | number | Date;
	descricao: string;
	valor: number | string;
	categoria_id: string;
	recebimento: string | Date;
	status_id: string;
}

export interface IReceitasActionData {
	success: boolean;
	formSuccess?: string;
	formError?: string;
	errors?: {
		fieldErrors?: Partial<Record<keyof IPostReceitas, string[]>>;
	};
}

export interface IReceitasTotalMensal {
	month: string;
	total: string;
}
