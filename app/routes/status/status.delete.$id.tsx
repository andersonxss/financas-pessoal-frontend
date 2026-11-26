import { redirect } from "react-router";
import { deleteStatus } from "@/server";
import { actionError } from "@/utils/actionError";

interface IParams {
	params: {
		id: string;
	};
}

export async function loader({ params }: Promise<Response> & IParams) {
	try {
		await deleteStatus(params.id);
		return redirect("/status");
	} catch (error) {
		throw actionError(error, { resource: "o status", operation: "excluir" });
	}
}
