import { isAxiosError } from "axios";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { data, Form, Link, redirect, useActionData, useNavigation, useSearchParams } from "react-router";
import api from "@/api/server";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Route } from "./+types/login";

export async function action({ request }: Route.ActionArgs) {
	const form = await request.formData();
	const tenant = String(form.get("tenant") ?? "").trim();
	const email = String(form.get("email") ?? "").trim();
	const password = String(form.get("password") ?? "");
	try {
		await api.post("/auth/login", { tenant, email, password });
		const redirectTo = new URL(request.url).searchParams.get("redirectTo");
		return redirect(redirectTo?.startsWith("/") && !redirectTo.startsWith("//") ? redirectTo : "/home");
	} catch (error) {
		const message = isAxiosError(error) && error.response?.status === 401
			? "Organização, e-mail ou senha não conferem."
			: "Não foi possível entrar agora. Tente novamente.";
		return data({ error: message }, { status: 400 });
	}
}

export default function Login() {
	const actionData = useActionData<typeof action>();
	const navigation = useNavigation();
	const [searchParams] = useSearchParams();
	const busy = navigation.state === "submitting";
	const passwordReset = searchParams.get("reset") === "success";
	return (
		<AuthShell title="Entre no seu espaço financeiro" description="Use a organização informada no convite e suas credenciais para continuar.">
			<Form method="post" className="space-y-5" replace>
				{passwordReset && (
					<p
						role="status"
						className="rounded-[14px] bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300"
					>
						Senha redefinida com sucesso. Entre com sua nova senha.
					</p>
				)}
				<div className="space-y-2">
					<Label htmlFor="tenant">Organização</Label>
					<Input id="tenant" name="tenant" autoComplete="organization" placeholder="ex.: minha-empresa" defaultValue={searchParams.get("tenant") ?? ""} required className="h-12 rounded-[14px]" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">E-mail</Label>
					<Input id="email" name="email" type="email" autoComplete="email" required className="h-12 rounded-[14px]" />
				</div>
				<div className="space-y-2">
					<div className="flex items-center justify-between gap-4">
						<Label htmlFor="password">Senha</Label>
						<Link to="/recuperar-senha" className="text-sm font-semibold underline decoration-[#8aa51f] underline-offset-4">Esqueci minha senha</Link>
					</div>
					<Input id="password" name="password" type="password" autoComplete="current-password" required className="h-12 rounded-[14px]" />
				</div>
				{actionData?.error && <p role="alert" className="rounded-[14px] bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">{actionData.error}</p>}
				<Button type="submit" disabled={busy} className="h-12 w-full rounded-[14px] font-bold">
					{busy ? <><LoaderCircle className="animate-spin" aria-hidden="true" />Entrando…</> : <>Entrar<ArrowRight aria-hidden="true" /></>}
				</Button>
			</Form>
		</AuthShell>
	);
}
