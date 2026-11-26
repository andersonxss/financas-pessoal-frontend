import { redirect } from "react-router";
import { actionError } from "@/utils/actionError";
import { deleteDespesa } from "@/server";

interface IParams {
	params: {
		id: string;
	};
}

export async function loader({ params }: Promise<Response> & IParams) {
	try {
		await deleteDespesa(params.id);
		return redirect("/despesas");
	} catch (error) {
		throw actionError(error, { resource: "a despesa", operation: "excluir" });
	}
}
