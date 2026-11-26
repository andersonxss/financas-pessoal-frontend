import {
	data,
	Form,
	redirect,
	useLoaderData,
	type ActionFunctionArgs,
} from "react-router";
import { getCategoria, putCategorias } from "@/server";
import { categoriasSchema } from "@/feature";
import type { ICategoriasForm, IParamsId } from "@/interfaces";
import { actionError } from "@/utils/actionError";
import Page from "@/components/page";
import CategoriasForms from "@/feature/categorias/categoriasForms";

export const action = async ({
	request,
	params,
}: ActionFunctionArgs & IParamsId) => {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await categoriasSchema.parseAsync(formData);
		await putCategorias(params.id, result);
		return data({ success: true, formSuccess: "Categoria atualizada com sucesso" });
	} catch (error) {
		return actionError(error, { resource: "a categoria", operation: "editar" });
	}
};

export async function loader({ params }: Promise<Response> & IParamsId) {
	const responseCategoria = await getCategoria(params.id);
	return { categoria: responseCategoria };
}

export default function () {
	const { categoria } = useLoaderData<ICategoriasForm>();
	return (
		<Page title="Editar Categoria">
			<Form method="put">
				<CategoriasForms
					defaultValues={{
						name: categoria.name,
						status_id: categoria.status_id,
					}}
				/>
			</Form>
		</Page>
	);
}
