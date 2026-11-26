import {
	type ActionFunctionArgs,
	data,
	Form,
	type LoaderFunctionArgs,
	useLoaderData,
} from "react-router";
import { Page } from "@/components";
import { receitasSchema } from "@/feature";
import { actionError } from "@/utils/actionError";
import ReceitasForms from "@/feature/receitas/receitasForms";
import type { ICategorias } from "@/interfaces/ICategorias";
import type { IReceitas } from "@/interfaces/IReceitas";
import { getCategorias, getReceita, putReceitas } from "@/server";

interface LoadData {
	categorias: ICategorias[];
	receita: IReceitas;
}

export async function loader({
	params,
}: LoaderFunctionArgs): Promise<LoadData> {
	if (!params.id) {
		throw data(
			{ message: "Identificador da receita não informado." },
			{ status: 400 },
		);
	}

	const [categorias, receita] = await Promise.all([
		getCategorias(),
		getReceita(params.id),
	]);

	return {
		categorias: categorias ?? [],
		receita,
	};
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const formData = Object.fromEntries(await request.formData());

	try {
		if (!params.id) {
			return data(
				{
					success: false,
					formError: "Identificador da receita não informado.",
				},
				{ status: 400 },
			);
		}

		const result = await receitasSchema.parseAsync(formData);
		await putReceitas(params.id, result);
		return data({
			success: true,
			formSuccess: "Receita editada com sucesso.",
		});
	} catch (error) {
		return actionError(error, {
			resource: "a receita",
			operation: "editar",
			fallbackMessage:
				"Não foi possível salvar a receita. Confira os dados informados e tente novamente.",
		});
	}
};

export default function Edit() {
	const { categorias, receita } = useLoaderData<typeof loader>();

	return (
		<Page title="Editar Receita">
			<Form method="put">
				<ReceitasForms
					categorias={categorias}
					defaultValues={{
						descricao: receita.descricao,
						categoria_id: receita.categoria_id,
						valor: receita.valor,
						recebimento: receita.recebimento.slice(0, 10),
						status_id: receita.status_id,
					}}
				/>
			</Form>
		</Page>
	);
}
