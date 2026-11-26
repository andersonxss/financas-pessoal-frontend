import {
	data,
	Form,
	useLoaderData,
	type ActionFunctionArgs,
} from "react-router";
import {
	getCategorias,
	getDespesa,
	getPagamentos,
	getParcelas,
	putDespesas,
} from "@/server";
import { despesasSchema } from "@/feature";
import type { IParamsId, IPostDespesas } from "@/interfaces";
import { getFormateDate } from "@/utils";
import { actionError } from "@/utils/actionError";
import { Page } from "@/components";
import DespesasForms from "@/feature/despesas/despesasForms";

interface LoadData {
	categorias: [];
	parcelas: [];
	pagamentos: [];
	gasto: IPostDespesas;
}

export const action = async ({
	request,
	params,
}: ActionFunctionArgs & IParamsId) => {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await despesasSchema.parseAsync(formData);
		await putDespesas(params.id, result);
		return data({ success: true, formSuccess: "Despesa editada com sucesso" });
	} catch (error) {
		return actionError(error, {
			resource: "a despesa",
			operation: "editar",
			fallbackMessage:
				"Não foi possível salvar a despesa agora. Tente novamente em alguns instantes.",
		});
	}
};

export async function loader({ params }: Promise<Response> & IParamsId) {
	const [
		responseCategorias,
		responseParcelas,
		responsePagamentos,
		responseGasto,
	] = await Promise.all([
		getCategorias(),
		getParcelas(),
		getPagamentos(),
		getDespesa(params.id),
	]).then((response) => {
		return response;
	});

	return {
		categorias: responseCategorias,
		parcelas: responseParcelas,
		pagamentos: responsePagamentos,
		gasto: responseGasto,
	};
}

export default function Create() {
	const { categorias, parcelas, pagamentos, gasto } = useLoaderData<LoadData>();
	return (
		<Page title="Editar Despesa">
			<Form method="post">
				<DespesasForms
					categorias={categorias}
					parcelas={parcelas}
					pagamentos={pagamentos}
					defaultValues={{
						categoria_id: gasto.categoria_id,
						pagamento_id: gasto.pagamento_id,
						parcela_id: gasto.parcela_id,
						descricao: gasto.descricao,
						valor: gasto.valor,
						vencimento: getFormateDate(gasto.vencimento),
						status_id: gasto.status_id,
					}}
				/>
			</Form>
		</Page>
	);
}
