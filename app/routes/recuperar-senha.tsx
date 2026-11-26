import { ArrowLeft, LoaderCircle, MailCheck } from "lucide-react";
import { data, Form, Link, useActionData, useNavigation } from "react-router";
import api from "@/api/server";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Route } from "./+types/recuperar-senha";

export async function action({ request }: Route.ActionArgs) {
	const form = await request.formData();
	try {
		await api.post("/auth/recovery", {
			tenant: String(form.get("tenant") ?? "").trim(),
			email: String(form.get("email") ?? "").trim(),
		});
		return { sent: true };
	} catch {
		return data({ sent: false, error: "Não foi possível solicitar a recuperação agora." }, { status: 400 });
	}
}

export default function Recovery() {
	const result = useActionData<typeof action>();
	const navigation = useNavigation();
	if (result?.sent) {
		return <AuthShell title="Confira sua caixa de entrada" description="Se os dados estiverem corretos, enviamos um link de uso único que expira em 30 minutos.">
			<div className="rounded-[24px] bg-primary/30 p-6"><MailCheck className="size-8" aria-hidden="true" /><p className="mt-4 text-sm leading-6">Por segurança, a resposta é a mesma mesmo quando a conta não existe.</p></div>
			<Button asChild variant="outline" className="mt-6 h-12 rounded-[14px]"><Link to="/login"><ArrowLeft aria-hidden="true" />Voltar ao login</Link></Button>
		</AuthShell>;
	}
	return <AuthShell title="Recupere seu acesso" description="Informe a organização e o e-mail da conta. Você receberá instruções seguras para criar uma nova senha.">
		<Form method="post" className="space-y-5">
			<div className="space-y-2"><Label htmlFor="tenant">Organização</Label><Input id="tenant" name="tenant" required placeholder="ex.: minha-empresa" className="h-12 rounded-[14px]" /></div>
			<div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" autoComplete="email" required className="h-12 rounded-[14px]" /></div>
			{result && "error" in result && result.error && <p role="alert" className="text-sm font-medium text-destructive">{result.error}</p>}
			<Button className="h-12 w-full rounded-[14px] font-bold" disabled={navigation.state === "submitting"}>{navigation.state === "submitting" ? <><LoaderCircle className="animate-spin" />Enviando…</> : "Enviar instruções"}</Button>
			<Link to="/login" className="flex items-center justify-center gap-2 text-sm font-semibold"><ArrowLeft className="size-4" />Voltar ao login</Link>
		</Form>
	</AuthShell>;
}
