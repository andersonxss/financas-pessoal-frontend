import { data, useLoaderData } from "react-router";
import { Page } from "@/components";
import { actionError } from "@/utils/actionError";
import DespesasTableDataPdf from "@/feature/despesas/temporarias/temporariasTable";
import {
	getCategorias,
	getDespesasPDF,
	getPagamentos,
	getParcelas,
} from "@/server";

export async function loader({
	params,
}: {
	params: { id: string };
}): Promise<Response | any> {
	const id = params.id;
	const responses = await Promise.all([
		getCategorias(),
		getParcelas(),
		getPagamentos(),
		getDespesasPDF(id),
	]).catch((error: unknown) => {
		throw actionError(error, {
			resource: "os lançamentos importados",
			operation: "carregar",
			fallbackMessage:
				"Não foi possível carregar os lançamentos importados. Tente novamente.",
		});
	});
	const [
		responseCategorias,
		responseParcelas,
		responsePagamentos,
		responseDespesasPdf,
	] = responses;

	return data({
		despesas: responseDespesasPdf,
		categorias: responseCategorias,
		parcelas: responseParcelas,
		pagamentos: responsePagamentos,
	});
}

const Index = () => {
	const data = useLoaderData<any>();

	return (
		<Page title="Revisar lançamentos importados">
			<DespesasTableDataPdf props={data} />
		</Page>
	);
};

export default Index;
