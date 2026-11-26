import { configCategorias } from "@/constants";
import type { ICategorias, IPostCategorias } from "@/interfaces/ICategorias";
import api from "@/api/server";

export async function postCategoria(data: IPostCategorias): Promise<undefined> {
	const response = await api.post(configCategorias.redirect, data);
	if (response) {
		return response.data;
	}
}

export async function putCategorias(
	id?: string,
	data?: any,
): Promise<undefined> {
	const response = await api.put(`${configCategorias.redirect}/${id}`, data);
	if (response) {
		return response.data;
	}
}

export async function getCategorias(): Promise<ICategorias[] | undefined> {
	const response = await api.get(configCategorias.redirect);
	if (response) {
		return response.data;
	}
}

export async function getCategoria(id: any) {
	const response = await api.get(`${configCategorias.redirect}/${id}`);
	if (response) {
		return response.data;
	}
}

export async function deleteCategoria(id: string | undefined) {
	const response = await api.delete(`${configCategorias.redirect}/${id}`);
	if (response) {
		return response.data;
	}
}
