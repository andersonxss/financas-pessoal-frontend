import { type ActionFunctionArgs, data } from "react-router";
import { actionError } from "@/utils/actionError";
import { deleteReceita } from "@/server";

export async function action({ params, request }: ActionFunctionArgs) {
	if (request.method !== "DELETE") {
		return data(
			{ success: false, formError: "Método não permitido." },
			{ status: 405 },
		);
	}
	if (!params.id) {
		return data(
			{ success: false, formError: "Identificador da receita não informado." },
			{ status: 400 },
		);
	}

	try {
		await deleteReceita(params.id);
		return data({
			success: true,
			formSuccess: "Receita excluída com sucesso.",
		});
	} catch (error) {
		return actionError(error, {
			resource: "a receita",
			operation: "excluir",
			fallbackMessage: "Não foi possível excluir a receita. Tente novamente.",
		});
	}
}
