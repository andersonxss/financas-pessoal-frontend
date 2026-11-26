import api from "@/api/server";
import { configDespesas } from "@/constants";
import type {
	CategoriaDespesaAnual,
	CategoriaDespesaMensal,
	PagamentoDespesaAnual,
} from "@/interfaces";
import type {
	FinancialProcessSourceItem,
	IDespesas,
	IPostDespesas,
} from "@/interfaces/IDespesas";

const ROTA = "/despesas";

export interface TemporaryPdfBatch {
	id: string;
	dataCount: number;
	data: FinancialProcessSourceItem[];
}

export interface UploadFinancialDocumentResponse extends TemporaryPdfBatch {
	message: string;
}

export async function postDespesas(data: IPostDespesas): Promise<any> {
	const response = await api.post(ROTA, data);
	if (response) {
		return response.data;
	}
}

export async function putDespesas(
	id?: string,
	data?: IPostDespesas,
): Promise<any> {
	const response = await api.put(`${ROTA}/${id}`, data);
	if (response) {
		return response.data;
	}
}

export async function postUploadDespesas(
	file: File,
	vencimento: string,
	tipo: string,
): Promise<UploadFinancialDocumentResponse> {
	const formData = new FormData();
	formData.append("file", file);
	const searchParams = new URLSearchParams({ vencimento, tipo });
	const response = await api.post<UploadFinancialDocumentResponse>(
		`/files/despesas?${searchParams.toString()}`,
		formData,
	);

	return response.data;
}

export async function putStatusDespesas(
	id?: string,
	status?: string,
): Promise<any> {
	const response = await api.put(
		`${configDespesas.redirect}/status/${id}/${status}`,
	);
	if (response) {
		return response.data;
	}
}

export async function getDespesas(
	ano: number,
	mes: number,
): Promise<IDespesas[] | undefined> {
	const response = await api.get(`${ROTA}/${ano}/${mes}`);
	if (response) {
		return response.data;
	}
}

export async function getDespesasPDF(
	id: string,
): Promise<FinancialProcessSourceItem[]> {
	const response = await api.get<FinancialProcessSourceItem[]>(
		`${ROTA}/upload/${id}`,
	);
	return response.data;
}

export async function getTemporaryDespesas(): Promise<TemporaryPdfBatch[]> {
	const response = await api.get<TemporaryPdfBatch[]>(`${ROTA}/upload`);
	return Array.isArray(response.data) ? response.data : [];
}

export async function getValorTotalDespesas(): Promise<IDespesas[] | []> {
	const response = await api.get(`${ROTA}/total`);
	if (response) {
		return response.data;
	}
	return [];
}

export async function getSomalTotalDespeasValoresService(
	ano: number,
): Promise<IDespesas[] | []> {
	const response = await api.get(`${ROTA}/soma/total/mes/${ano}`);
	if (response) {
		return response.data;
	}
	return [];
}

export async function getSomaTotalDespesasCategoriaService(
	ano: number,
): Promise<CategoriaDespesaAnual[]> {
	const response = await api.get<CategoriaDespesaAnual[]>(
		`${ROTA}/soma/total/categoria/${ano}`,
	);
	return Array.isArray(response.data) ? response.data : [];
}

export async function getSomaTotalDespesasCategoriaMesService(
	ano: number,
): Promise<CategoriaDespesaMensal[]> {
	const response = await api.get<CategoriaDespesaMensal[]>(
		`${ROTA}/soma/total/categoria/mes/${ano}`,
	);
	return Array.isArray(response.data) ? response.data : [];
}

export async function getSomaTotalDespesasPagamentoService(
	ano: number,
): Promise<PagamentoDespesaAnual[]> {
	const response = await api.get<PagamentoDespesaAnual[]>(
		`${ROTA}/soma/total/pagamento/${ano}`,
	);
	return Array.isArray(response.data) ? response.data : [];
}

export async function getDespesa(id: any) {
	const response = await api.get(`${ROTA}/${id}`);
	if (response) {
		return response.data;
	}
}

export async function getDespesaMes(id: number) {
	const response = await api.get(`${ROTA}/listMes/${id}`).catch((erro) => {
		console.log(erro);
	});
	if (response) {
		return response.data;
	}
}

export async function deleteDespesa(id: string | undefined) {
	const response = await api.delete(`${ROTA}/${id}`);
	if (response) {
		return response.data;
	}
}

export async function deleteTemporaryDespesa(
	id: string,
): Promise<{ message: string }> {
	const response = await api.delete<{ message: string }>(
		`${ROTA}/upload/${id}`,
	);
	return response.data;
}
