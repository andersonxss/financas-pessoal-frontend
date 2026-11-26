import { redirect } from "react-router";
import { actionError } from "@/utils/actionError";
import { deleteTemporaryDespesa } from "@/server";

interface IParams {
	params: {
		id: string;
	};
}

export async function loader({ params }: Promise<Response> & IParams) {
	try {
		await deleteTemporaryDespesa(params.id);
		return redirect("/despesas/temporarias");
	} catch (error) {
		throw actionError(error, { resource: "a despesa", operation: "excluir" });
	}
}
