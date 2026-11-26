import { data, Form, redirect, type ActionFunctionArgs } from "react-router";
import { postPagamento } from "@/server/pagamentos.server";
import { pagamentosSchema } from "@/feature/pagamentos/pagamentosSchema";
import { actionError } from "@/utils/actionError";
import Page from "@/components/page";
import PagamentosForms from "@/feature/pagamentos/pagamentosForms";
import { statusAtivoId } from "@/constants/tipoStatus";

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await pagamentosSchema.parseAsync(formData);
		await postPagamento(result);
		return data({ success: true, formSuccess: "Tipo de pagamento criado com sucesso" });
	} catch (error) {
		return actionError(error, {
			resource: "o tipo de pagamento",
			operation: "criar",
		});
	}
};

export default function Create() {
	return (
		<Page title="Novo Tipo de Pagamento">
			<Form method="post">
				<PagamentosForms
					defaultValues={{ name: "", status_id: statusAtivoId }}
				/>
			</Form>
		</Page>
	);
}
