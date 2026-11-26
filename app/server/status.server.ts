// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configStatus } from "@/constants";
import api from "@/api/server";

type Status = {
	id: string;
	name: string;
};

type IPostStatus = {
	name: string;
};

export async function postStatus(data: IPostStatus): Promise<undefined> {
	const response = await api.post(configStatus.redirect, data);
	if (response) {
		return response.data;
	}
}

export async function putStatus(id?: string, data?: any): Promise<undefined> {
	const response = await api.put(`${configStatus.redirect}/${id}`, data);
	if (response) {
		return response.data;
	}
}

export async function getListStatus(): Promise<Status[] | undefined> {
	const response = await api.get(configStatus.redirect);
	if (response) {
		return response.data;
	}
}

export async function getStatus(id: string | undefined) {
	const response = await api.get(`${configStatus.redirect}/${id}`);
	if (response) {
		return response.data;
	}
}

export async function deleteStatus(id: string | undefined) {
	const response = await api.delete(`${configStatus.redirect}/${id}`);
	if (response) {
		return response.data;
	}
}
