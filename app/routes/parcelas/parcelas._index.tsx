import { data, useLoaderData } from "react-router";
import { Page } from "@/components";
import ParcelasTable from "@/feature/parcelas/parcelasTable";
import { getParcelas } from "@/server";

interface LoadData {
	parcelas: [];
}

export async function loader(): Promise<Response | any> {
	const response = await getParcelas();
	return data({ parcelas: response });
}

const Index = () => {
	const { parcelas } = useLoaderData<LoadData>();

	return (
		<Page title="Parcelas">
			<ParcelasTable parcelas={parcelas} />
		</Page>
	);
};

export default Index;
