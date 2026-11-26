import { isAxiosError } from "axios";
import { data } from "react-router";
import { z } from "zod";

export type ActionErrorOperation =
	| "carregar"
	| "criar"
	| "editar"
	| "excluir"
	| "atualizar"
	| "salvar";

interface ActionErrorOptions {
	resource: string;
	operation: ActionErrorOperation;
	fallbackMessage?: string;
}

const operationLabels: Record<ActionErrorOperation, string> = {
	carregar: "carregar",
	criar: "cadastrar",
	editar: "salvar",
	excluir: "excluir",
	atualizar: "atualizar",
	salvar: "salvar",
};

export function getActionErrorMessage(
	error: unknown,
	{ resource, operation, fallbackMessage }: ActionErrorOptions,
): string {
	const action = operationLabels[operation];
	const fallback =
		fallbackMessage ??
		`Não foi possível ${action} ${resource}. Tente novamente em alguns instantes.`;

	if (!isAxiosError(error)) return fallback;

	const status = error.response?.status;
	if (status === 404)
		return `Não encontramos ${resource}. Atualize a página e tente novamente.`;
	if (status === 401 || status === 403) {
		return "Você não tem permissão para realizar esta operação.";
	}
	if (status === 400 || status === 422) {
		return `Não foi possível ${action} ${resource}. Confira os dados informados e tente novamente.`;
	}
	return fallback;
}

export function actionError(error: unknown, options: ActionErrorOptions) {
	if (error instanceof z.ZodError) {
		return data({ success: false, errors: error.flatten() }, { status: 400 });
	}

	if (!isAxiosError(error)) throw error;

	const status = error.response?.status;
	return data(
		{
			success: false,
			formError: getActionErrorMessage(error, options),
		},
		{ status: status && status >= 400 && status <= 599 ? status : 500 },
	);
}
