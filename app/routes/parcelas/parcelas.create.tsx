import { data, Form, type ActionFunctionArgs } from "react-router";
import { postParcela } from "@/server";
import { parcelasSchema } from "@/feature";
import { actionError } from "@/utils/actionError";
import Page from "@/components/page";
import ParcelasForms from "@/feature/parcelas/parcelasForms";
import { statusAtivoId } from "@/constants";

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await parcelasSchema.parseAsync(formData);
		await postParcela(result);
		return data({ success: true, formSuccess: "Parcela criada com sucesso" });
	} catch (error) {
		return actionError(error, { resource: "a parcela", operation: "criar" });
	}
};

export default function Create() {
	return (
		<Page title="Nova Parcela">
			<Form method="post">
				<ParcelasForms defaultValues={{ name: "", status_id: statusAtivoId }} />
			</Form>
		</Page>
	);
}
