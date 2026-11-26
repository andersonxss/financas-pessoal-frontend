import { data, useLoaderData } from "react-router";
import { Page } from "@/components";
import { StatusTables } from "@/feature";
import type { IStatus } from "@/interfaces";
import { getListStatus } from "@/server";

interface LoadData {
	status: Array<IStatus>;
}

export async function loader(): Promise<Response | any> {
	const response = await getListStatus();
	return data({ status: response });
}

const Index = () => {
	const { status } = useLoaderData<LoadData>();

	return (
		<Page title="Status">

			<StatusTables status={status} />
		</Page>
	);
};

export default Index;
