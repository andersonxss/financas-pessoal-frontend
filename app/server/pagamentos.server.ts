import { configPagamentos } from "@/constants";
import type { IPagamentos, IPagamento } from "@/interfaces/IPagamentos";
import api from "@/api/server";

export async function postPagamento(data: IPagamento): Promise<undefined> {
	const response = await api.post(configPagamentos.redirect, data);
	if (response) {
		return response.data;
	}
}

export async function putPagamentos(id?: string, data?: any): Promise<any> {
	const response = await api.put(`${configPagamentos.redirect}/${id}`, data);
	if (response) {
		return response.data;
	}
}

export async function getPagamentos(): Promise<IPagamentos[] | undefined> {
	const response = await api.get(configPagamentos.redirect);
	if (response) {
		return response.data;
	}
}

export async function getPagamento(id: any) {
	const response = await api.get(`${configPagamentos.redirect}/${id}`);
	if (response) {
		return response.data;
	}
}

export async function deletePagamento(id: string | undefined) {

	const response = await api.put(`${configPagamentos.redirect}/status/${id}`);
	if (response) {
		return response.data;
	}
}
