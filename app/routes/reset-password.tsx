import { isAxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useMemo } from "react";
import {
	data,
	Form,
	Link,
	redirect,
	useActionData,
	useNavigation,
	useSearchParams,
} from "react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import AuthFormsResetForm from "@/feature/auth/authFormsResetForm";
import { authFormsResetSchema } from "@/feature/auth/authFormsResetSchema";
import { putResetPassWord } from "@/server";
import { actionError } from "@/utils";
import type { Route } from "./+types/reset-password";

export async function action({ request }: Route.ActionArgs) {
	const formData = Object.fromEntries(await request.formData());

	try {
		const result = await authFormsResetSchema.parseAsync(formData);
		const { confirmation: _confirmation, ...payload } = result;
		await putResetPassWord(payload);
		return redirect("/login?reset=success");
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 400) {
			return data(
				{
					success: false as const,
					formError:
						"Este link é inválido, expirou ou já foi usado. Solicite uma nova recuperação.",
				},
				{ status: 400 },
			);
		}
		return actionError(error, {
			resource: "a senha",
			operation: "atualizar",
			fallbackMessage:
				"Não foi possível resetar a senha. Confira os dados informados e tente novamente.",
		});
	}
}

export default function ResetPassword() {
	const result = useActionData<typeof action>();
	const navigation = useNavigation();
	const [params] = useSearchParams();
	const token = params.get("token") ?? "";
	const defaultValues = useMemo(() => ({ token }), [token]);
	return (
		<AuthShell
			title="Crie uma nova senha"
			description="Use ao menos 6 caracteres, com letra maiúscula, minúscula, número e caractere especial."
		>
			<Form method="post" className="space-y-5">
				<AuthFormsResetForm defaultValues={defaultValues} />
				{result && "formError" in result && result.formError && (
					<div className="space-y-3">
						<p role="alert" className="text-sm font-medium text-destructive">
							{result.formError}
						</p>
						<Link
							to="/recuperar-senha"
							className="inline-flex text-sm font-semibold underline decoration-[#8aa51f] underline-offset-4"
						>
							Solicitar novo link
						</Link>
					</div>
				)}
				<Button
					className="h-12 w-full rounded-[14px] font-bold"
					disabled={navigation.state === "submitting"}
				>
					{navigation.state === "submitting" ? (
						<>
							<LoaderCircle className="animate-spin" aria-hidden="true" />
							Salvando…
						</>
					) : (
						"Salvar nova senha"
					)}
				</Button>
			</Form>
		</AuthShell>
	);
}
