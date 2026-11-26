import { redirect } from "react-router";
import { deleteParcela } from "@/server";
import { actionError } from "@/utils/actionError";

interface IParams {
	params: {
		id: string;
	};
}

export async function loader({ params }: Promise<Response> & IParams) {
	try {
		await deleteParcela(params.id);
		return redirect("/parcelas");
	} catch (error) {
		throw actionError(error, { resource: "a parcela", operation: "excluir" });
	}
}
