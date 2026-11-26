import type { IStatus } from "./IStatus";

export interface ICategorias {
	id: string;
	name: string;
	status_id: string;
	status: IStatus;
}

export interface ICategoriasForm {
	categoria: ICategorias;
	defaultValue: string;
	status: [];
}

export interface IPostCategorias {
	name: string;
	status_id: string;
}
