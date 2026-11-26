import { redirect } from "react-router";
import { deleteCategoria } from "@/server/categorias.server";
import { actionError } from "@/utils/actionError";

interface IParams {
	params: {
		id: string;
	};
}

export async function loader({ params }: Promise<Response> & IParams) {
	try {
		await deleteCategoria(params.id);
		return redirect("/categorias");
	} catch (error) {
		throw actionError(error, { resource: "a categoria", operation: "excluir" });
	}
}
