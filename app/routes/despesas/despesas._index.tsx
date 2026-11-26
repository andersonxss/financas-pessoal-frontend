import { data, useLoaderData } from "react-router";
import { Page } from "@/components";
import DespesasTable from "@/feature/despesas/despesasTable";
import type { IListDespesas } from "@/interfaces";
import {
	getCategorias,
	getDespesas,
	getPagamentos,
	getParcelas,
} from "@/server";

export async function loader(): Promise<Response | any> {
	const dataAtual = new Date();
	const ano = dataAtual.getFullYear();
	const mes = dataAtual.getMonth() + 1;
	const [
		responseDespeas,
		responseCategorias,
		responseParcelas,
		responsePagamentos,
	] = await Promise.all([
		getDespesas(ano, mes),
		getCategorias(),
		getParcelas(),
		getPagamentos(),
	]).then((response) => {
		return response;
	});

	return data({
		despesas: responseDespeas,
		categorias: responseCategorias,
		parcelas: responseParcelas,
		pagamentos: responsePagamentos,
	});
}

const Index = () => {
	const data = useLoaderData<IListDespesas>();
	return (
		<Page title="Despesas">
			<DespesasTable despesas={data?.despesas} />
		</Page>
	);
};

export default Index;
