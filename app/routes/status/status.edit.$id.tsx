import {
	data,
	Form,
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
	useLoaderData,
} from "react-router";
import { getStatus, putStatus } from "@/server";
import { statusSchema } from "@/feature";
import { actionError } from "@/utils/actionError";
import { Page } from "@/components";
import StatusForms from "@/feature/status/statusForms";

interface IParams {
	params: {
		id: string;
	};
}

interface IStatus {
	status: {
		name: string;
		defaultValue: string;
	};
}

export const action = async ({
	request,
	params,
}: ActionFunctionArgs & IParams) => {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await statusSchema.parseAsync(formData);
		await putStatus(params.id, result);
		return data({
			success: true,
			formSuccess: "Status atualizado com sucesso",
		});
	} catch (error) {
		return actionError(error, { resource: "o status", operation: "editar" });
	}
};

export async function loader({ params }: LoaderFunctionArgs) {
	if (!params.id) {
		throw data(
			{ message: "Identificador do status não informado." },
			{ status: 400 },
		);
	}

	const response = await getStatus(params.id);
	return { status: response };
}

export default function () {
	const { status } = useLoaderData<IStatus>();
	return (
		<Page title="Editar Status">
			<Form method="post">
				<StatusForms
					defaultValues={{
						name: status.name,
					}}
				/>
			</Form>
		</Page>
	);
}
