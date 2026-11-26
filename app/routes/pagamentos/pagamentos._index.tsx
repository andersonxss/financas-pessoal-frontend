import { data, useLoaderData } from "react-router";
import { Page } from "@/components";
import PagamentosTable from "@/feature/pagamentos/pagamentosTable";
import { getPagamentos } from "@/server/pagamentos.server";

interface LoadData {
	pagamentos: [];
}

export async function loader(): Promise<Response | any> {
	const response = await getPagamentos();
	return data({ pagamentos: response });
}

const Index = () => {
	const { pagamentos } = useLoaderData<LoadData>();

	return (
		<Page title="Tipos de pagamento">
			<PagamentosTable pagamentos={pagamentos} />
		</Page>
	);
};

export default Index;
