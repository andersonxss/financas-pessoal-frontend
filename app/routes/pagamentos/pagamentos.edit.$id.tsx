import {
	data,
	Form,
	redirect,
	useLoaderData,
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from "react-router";
import { getPagamento, putPagamentos } from "@/server/pagamentos.server";
import { pagamentosSchema } from "@/feature/pagamentos/pagamentosSchema";
import type { IPagamentosForm } from "@/interfaces/IPagamentos";
import { actionError } from "@/utils/actionError";
import Page from "@/components/page";
import PagamentosForms from "@/feature/pagamentos/pagamentosForms";

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await pagamentosSchema.parseAsync(formData);
		await putPagamentos(params.id, result);
		return data({ success: true, formSuccess: "Tipo de pagamento atualizado com sucesso" });
	} catch (error) {
		return actionError(error, {
			resource: "o tipo de pagamento",
			operation: "editar",
		});
	}
}

export async function loader({ params }: LoaderFunctionArgs) {
	const pagamento = await getPagamento(params.id);
	return { pagamento };
}

export default function Edit() {
	const { pagamento } = useLoaderData<IPagamentosForm>();
	return (
		<Page title="Editar Tipo de Pagamento">
			<Form method="put">
				<PagamentosForms
					defaultValues={{
						name: pagamento.name,
						status_id: pagamento.status_id,
					}}
				/>
			</Form>
		</Page>
	);
}
