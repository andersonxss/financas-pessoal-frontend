import { data, useLoaderData } from "react-router";
import { Page } from "@/components";
import CategoriasTable from "@/feature/categorias/categoriasTable";
import { getCategorias } from "@/server/categorias.server";

interface LoadData {
	categorias: [];
}

export async function loader(): Promise<Response | any> {
	const response = await getCategorias();
	return data({ categorias: response });
}

const Index = () => {
	const { categorias } = useLoaderData<LoadData>();

	return (
		<Page title="Categorias">
			<CategoriasTable categorias={categorias} />
		</Page>
	);
};

export default Index;
