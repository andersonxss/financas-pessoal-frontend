import api from "@/api/server";
import type {
	IPostReceitas,
	IReceitas,
	IReceitasTotalMensal,
} from "@/interfaces/IReceitas";

const ENDPOINT = "/receitas";

export async function postReceitas(data: IPostReceitas): Promise<IReceitas> {
	const response = await api.post<IReceitas>(ENDPOINT, data);
	return response.data;
}

export async function putReceitas(
	id: string,
	data: IPostReceitas,
): Promise<IReceitas> {
	const response = await api.put<IReceitas>(`${ENDPOINT}/${id}`, data);
	return response.data;
}

export async function putStatusReceitas(
	id: string,
	status: string,
): Promise<IReceitas> {
	const response = await api.put<IReceitas>(
		`${ENDPOINT}/status/${id}/${status}`,
	);
	return response.data;
}

export async function getReceitas(
	ano: string,
	mes: string,
): Promise<IReceitas[]> {
	const response = await api.get<IReceitas[]>(`${ENDPOINT}/${ano}/${mes}`);
	return response.data;
}

export async function getReceita(id: string): Promise<IReceitas> {
	const response = await api.get<IReceitas>(`${ENDPOINT}/${id}`);
	return response.data;
}

export async function getSomalTotalMesAnoReceitasService(
	ano: number,
): Promise<IReceitasTotalMensal[]> {
	const response = await api.get<IReceitasTotalMensal[]>(
		`${ENDPOINT}/soma/total/mes/${ano}`,
	);
	return response.data;
}

export async function deleteReceita(id: string): Promise<void> {
	await api.delete(`${ENDPOINT}/${id}`);
}
