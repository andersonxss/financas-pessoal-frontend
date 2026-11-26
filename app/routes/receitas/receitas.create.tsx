import {
	type ActionFunctionArgs,
	data,
	Form,
	useLoaderData,
} from "react-router";
import { Page } from "@/components";
import { statusAbertoId } from "@/constants";
import { receitasSchema } from "@/feature";
import { actionError } from "@/utils/actionError";
import ReceitasForms from "@/feature/receitas/receitasForms";
import type { ICategorias } from "@/interfaces/ICategorias";
import { getCategorias, postReceitas } from "@/server";

interface LoadData {
	categorias: ICategorias[];
}

export async function loader(): Promise<LoadData> {
	const categorias = await getCategorias();
	return { categorias: categorias ?? [] };
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = Object.fromEntries(await request.formData());

	try {
		const result = await receitasSchema.parseAsync(formData);
		await postReceitas(result);
		return data({
			success: true,
			formSuccess: "Receita cadastrada com sucesso.",
		});
	} catch (error) {
		return actionError(error, {
			resource: "a receita",
			operation: "criar",
			fallbackMessage:
				"Não foi possível cadastrar a receita. Confira os dados informados e tente novamente.",
		});
	}
};

export default function Create() {
	const { categorias } = useLoaderData<typeof loader>();

	return (
		<Page title="Nova Receita">
			<Form method="post">
				<ReceitasForms
					categorias={categorias}
					defaultValues={{
						descricao: "",
						categoria_id: "",
						valor: "",
						recebimento: "",
						status_id: statusAbertoId,
					}}
				/>
			</Form>
		</Page>
	);
}
