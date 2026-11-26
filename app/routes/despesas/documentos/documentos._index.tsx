import { type ActionFunctionArgs, data, Form, redirect } from "react-router";
import { Page } from "@/components";
import { despesasSchemaUpload } from "@/feature";
import DocumentosForms from "@/feature/despesas/documentos/documentosForms";
import { postUploadDespesas } from "@/server";
import { actionError } from "@/utils/actionError";

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await despesasSchemaUpload.parseAsync(formData);
		const file = result.file;
		const tipo = result.tipo;
		const vencimento = result.vencimento;
		const response = await postUploadDespesas(file, vencimento, tipo);
		data({ success: true, formSuccess: response.message });
		return redirect(`/despesas/temporarias/${response?.id}`);
	} catch (error) {
		return actionError(error, {
			resource: "o arquivo de despesas",
			operation: "criar",
		});
	}
};

export default function Create() {
	return (
		<Page title="Upload de documento de despesas">
			<Form method="post" encType="multipart/form-data">
				<DocumentosForms
					defaultValues={{
						file: "",
						vencimento: "",
						tipo: "",
					}}
				/>
			</Form>
		</Page>
	);
}
