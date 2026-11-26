import { redirect, type ActionFunctionArgs } from "react-router";
import { configDespesas } from "@/constants";
import { putStatusDespesas } from "@/server";
import { actionError } from "@/utils/actionError";

interface IParams {
	params: {
		id: string;
		status: string;
	};
}

export async function loader({
	params,
	request,
}: ActionFunctionArgs & IParams) {
	try {
		await putStatusDespesas(params.id, params.status);
		const url = new URL(request.url);
		const path = url.searchParams.get("path");
		return redirect(path || configDespesas.redirect);
	} catch (error) {
		throw actionError(error, {
			resource: "o status da despesa",
			operation: "atualizar",
		});
	}
}
