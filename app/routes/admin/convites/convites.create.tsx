import { data, Form, type ActionFunctionArgs } from "react-router";
import { postConvites } from "@/server";
import { convitesSchema } from "@/feature";
import { actionError } from "@/utils/actionError";
import Page from "@/components/page";
import MembrosForms from "@/feature/convites/convitesForms";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = Object.fromEntries(await request.formData());
    try {
        const result = await convitesSchema.parseAsync(formData);
        await postConvites(result);
        return data({ success: true, formSuccess: "Convite criado com sucesso" });
    } catch (error) {
        return actionError(error, { resource: "a convite", operation: "criar" });
    }
};

export default function Create() {
    return (
        <Page title="Novo Convite">
            <Form method="post">
                <MembrosForms defaultValues={{ email: "", role: "" }} />
            </Form>
        </Page>
    );
}
