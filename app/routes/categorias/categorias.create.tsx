import { data, Form, redirect, type ActionFunctionArgs } from "react-router";
import { postCategoria } from "@/server/categorias.server";
import { categoriasSchema } from "@/feature/categorias/categoriasSchema";
import { actionError } from "@/utils/actionError";
import Page from "@/components/page";
import CategoriasForms from "@/feature/categorias/categoriasForms";
import { statusAtivoId } from "@/constants/tipoStatus";

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await categoriasSchema.parseAsync(formData);
		await postCategoria(result);
		return data({ success: true, formSuccess: "Categoria criada com sucesso" });
	} catch (error) {
		return actionError(error, { resource: "a categoria", operation: "criar" });
	}
};

export default function Create() {
	return (
		<Page title="Nova Categoria">
			<Form method="post">
				<CategoriasForms
					defaultValues={{ name: "", status_id: statusAtivoId }}
				/>
			</Form>
		</Page>
	);
}
