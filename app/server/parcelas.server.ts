import { configParcelas } from "@/constants";
import type { IParcelas, IParcela } from "@/interfaces/IParcelas";
import api from "@/api/server";

export async function postParcela(data: IParcela): Promise<any> {
	const response = await api.post(configParcelas.redirect, data);
	if (response) {
		return response.data;
	}
}

export async function putParcelas(id?: string, data?: any): Promise<undefined> {
	const response = await api.put(`${configParcelas.redirect}/${id}`, data);
	if (response) {
		return response.data;
	}
}

export async function getParcelas(): Promise<IParcelas[] | undefined> {
	const response = await api.get(configParcelas.redirect);
	if (response) {
		return response.data;
	}
}

export async function getParcela(id: string) {
	const response = await api.get(`${configParcelas.redirect}/${id}`);
	if (response) {
		return response.data;
	}
}

export async function deleteParcela(id: string | undefined) {
	const response = await api.put(`${configParcelas.redirect}/status/desativar/${id}`);
	if (response) {
		return response.data;
	}
}
