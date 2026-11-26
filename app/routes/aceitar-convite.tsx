import { LoaderCircle, UserPlus } from "lucide-react";
import { useMemo } from "react";
import {
	data,
	Form,
	Link,
	useActionData,
	useNavigation,
	useSearchParams,
} from "react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import ConvitesAceiteForms from "@/feature/convites/convitesAceiteForms";
import { convitesAceiteSchema } from "@/feature/convites/convitesAceiteSchema";
import { postAceiteConvites } from "@/server";
import { actionError } from "@/utils";
import type { Route } from "./+types/aceitar-convite";

export async function action({ request }: Route.ActionArgs) {
	const formData = Object.fromEntries(await request.formData());
	try {
		const result = await convitesAceiteSchema.parseAsync(formData);
		const { confirmation: _confirmation, ...payload } = result;
		const acceptedInvite = await postAceiteConvites(payload);
		return data({ accepted: true as const, ...acceptedInvite });
	} catch (error) {
		return actionError(error, {
			resource: "o convite",
			operation: "salvar",
			fallbackMessage: "Este convite é inválido, já foi usado ou expirou.",
		});
	}
}

export default function AcceptInvite() {
	const result = useActionData<typeof action>();
	const navigation = useNavigation();
	const [params] = useSearchParams();
	const token = params.get("token") ?? "";
	const defaultValues = useMemo(
		() => ({ token, name: "", password: "", confirmation: "" }),
		[token],
	);

	if (result && "accepted" in result && result.accepted && "tenant" in result) {
		return (
			<AuthShell
				title="Convite aceito"
				description="Sua conta foi criada e já pode acessar a organização."
			>
				<UserPlus className="size-10 text-[#879f24]" />
				<Button asChild className="mt-6 h-12 rounded-[14px]">
					<Link
						to={`/login${result.tenant ? `?tenant=${encodeURIComponent(result.tenant)}` : ""}`}
					>
						Ir para o login
					</Link>
				</Button>
			</AuthShell>
		);
	}

	return (
		<AuthShell
			title="Complete seu convite"
			description="Defina seu nome e uma senha forte para entrar no espaço da sua organização."
		>
			<Form method="post" className="space-y-5">
				<ConvitesAceiteForms defaultValues={defaultValues} />
				{result && "formError" in result && result.formError && (
					<p role="alert" className="text-sm font-medium text-destructive">
						{result.formError}
					</p>
				)}
				<Button
					className="h-12 w-full rounded-[14px] font-bold"
					disabled={navigation.state === "submitting"}
				>
					{navigation.state === "submitting" ? (
						<>
							<LoaderCircle className="animate-spin" />
							Criando conta…
						</>
					) : (
						"Aceitar convite"
					)}
				</Button>
			</Form>
		</AuthShell>
	);
}
