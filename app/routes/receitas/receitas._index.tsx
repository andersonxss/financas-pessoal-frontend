import { useLoaderData } from "react-router";
import { Page } from "@/components";
import { getActionErrorMessage } from "@/utils/actionError";
import ReceitasTable from "@/feature/receitas/receitasTable";
import type { IReceitasLoaderData } from "@/interfaces";
import { getReceitas } from "@/server";

export async function loader(): Promise<IReceitasLoaderData> {
	const ano = new Date().getFullYear();
	const mes = new Date().getMonth() + 1;

	try {
		const receitas = await getReceitas(String(ano), String(mes));
		return { receitas };
	} catch (error) {
		return {
			receitas: [],
			loadError: getActionErrorMessage(error, {
				resource: "as receitas",
				operation: "carregar",
				fallbackMessage:
					"Não foi possível carregar as receitas agora. Tente novamente em alguns instantes.",
			}),
		};
	}
}

export default function Index() {
	const { receitas, loadError } = useLoaderData<typeof loader>();

	return (
		<Page title="Receitas">
			<ReceitasTable receitas={receitas} loadError={loadError} />
		</Page>
	);
}
