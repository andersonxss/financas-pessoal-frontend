import { redirect } from "react-router";
import { deletePagamento } from "@/server";
import type { IParamsId } from "@/interfaces";
import { actionError } from "@/utils/actionError";

export async function loader({ params }: Promise<Response> & IParamsId) {
	try {
		await deletePagamento(params.id);
		return redirect("/pagamentos");
	} catch (error) {
		throw actionError(error, {
			resource: "o tipo de pagamento",
			operation: "excluir",
		});
	}
}
