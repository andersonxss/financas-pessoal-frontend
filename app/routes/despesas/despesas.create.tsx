import {
	type ActionFunctionArgs,
	data,
	Form,
	useLoaderData,
} from "react-router";
import { Page } from "@/components";
import { statusAbertoId } from "@/constants";
import { despesasSchema } from "@/feature";
import DespesasForms from "@/feature/despesas/despesasForms";
import type { ICategorias } from "@/interfaces/ICategorias";
import type { IPagamentos } from "@/interfaces/IPagamentos";
import type { IParcelas } from "@/interfaces/IParcelas";
import {
	getCategorias,
	getPagamentos,
	getParcelas,
	postDespesas,
} from "@/server";
import { actionError } from "@/utils/actionError";

interface LoadData {
	categorias: ICategorias[];
	parcelas: IParcelas[];
	pagamentos: IPagamentos[];
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await despesasSchema.parseAsync(formData);
		await postDespesas(result);
		return data({ success: true, formSuccess: "Despesa criada com sucesso" });
	} catch (error) {
		return actionError(error, { resource: "a despesa", operation: "criar" });
	}
};

export async function loader(): Promise<Response | LoadData> {
	const [responseCategorias, responseParcelas, responsePagamentos] =
		await Promise.all([getCategorias(), getParcelas(), getPagamentos()]).then(
			(response) => {
				return response;
			},
		);

	return {
		categorias: responseCategorias || [],
		parcelas: responseParcelas || [],
		pagamentos: responsePagamentos || [],
	};
}

export default function Create() {
	const { categorias, parcelas, pagamentos } = useLoaderData<LoadData>();
	return (
		<Page title="Nova Despesa">
			<Form method="post">
				<DespesasForms
					categorias={categorias}
					parcelas={parcelas}
					pagamentos={pagamentos}
					defaultValues={{
						categoria_id: "",
						pagamento_id: "",
						parcela_id: "",
						descricao: "",
						valor: "",
						vencimento: "",
						status_id: statusAbertoId,
					}}
				/>
			</Form>
		</Page>
	);
}
