import { data, Form, type ActionFunctionArgs } from "react-router";
import { postStatus } from "@/server";
import { StatusForms, statusSchema } from "@/feature";
import { actionError } from "@/utils/actionError";
import Page from "@/components/page";

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await statusSchema.parseAsync(formData);
		await postStatus(result);
		return data({ success: true, formSuccess: "Status criado com sucesso" });
	} catch (error) {
		return actionError(error, { resource: "o status", operation: "criar" });
	}
};

export default function Create() {
	return (
		<Page title="Novo Status">
			<Form method="post">
				<StatusForms defaultValues={{ name: "" }} />
			</Form>
		</Page>
	);
}
