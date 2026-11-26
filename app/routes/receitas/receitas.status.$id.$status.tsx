import { type ActionFunctionArgs, data } from "react-router";
import { actionError } from "@/utils/actionError";
import { putStatusReceitas } from "@/server";

export async function action({ params, request }: ActionFunctionArgs) {
	if (request.method !== "PUT") {
		return data(
			{ success: false, formError: "Método não permitido." },
			{ status: 405 },
		);
	}
	if (!params.id || !params.status) {
		return data(
			{ success: false, formError: "Dados da receita não informados." },
			{ status: 400 },
		);
	}

	try {
		await putStatusReceitas(params.id, params.status);
		return data({
			success: true,
			formSuccess: "Status da receita atualizado com sucesso.",
		});
	} catch (error) {
		return actionError(error, {
			resource: "o status da receita",
			operation: "atualizar",
			fallbackMessage:
				"Não foi possível atualizar o status da receita. Tente novamente.",
		});
	}
}
