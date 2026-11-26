import {
	data,
	Form,
	useLoaderData,
	type ActionFunctionArgs,
} from "react-router";
import { getParcela, putParcelas } from "@/server";
import type { IParamsId, IParcelasForm } from "@/interfaces";
import { actionError } from "@/utils/actionError";
import { parcelasSchema } from "@/feature";
import { Page } from "@/components";
import ParcelasForms from "@/feature/parcelas/parcelasForms";
import { statusAtivoId } from "@/constants/tipoStatus";


export const action = async ({
	request,
	params,
}: ActionFunctionArgs & IParamsId) => {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await parcelasSchema.parseAsync(formData);
		await putParcelas(params.id, result);
		return data({ success: true, formSuccess: "Parcela atualizada com sucesso" });
	} catch (error) {
		return actionError(error, { resource: "a parcela", operation: "editar" });
	}
};

export async function loader({ params }: Promise<Response> & IParamsId) {
	const response = await getParcela(params.id);
	return { parcela: response };
}

export default function Create() {
	const { parcela } = useLoaderData<IParcelasForm>();
	return (
		<Page title="Editar Parcela">
			<Form method="post">
				<ParcelasForms
					defaultValues={{ name: parcela.name, status_id: statusAtivoId }}
				/>
			</Form>
		</Page>
	);
}
