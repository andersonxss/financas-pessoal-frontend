import { isAxiosError } from "axios";
import { Copy, LoaderCircle, MailPlus, Trash2, Users } from "lucide-react";
import { data, Form, useActionData, useLoaderData, useNavigation } from "react-router";
import api from "@/api/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Route } from "../+types/membros";
import Page from "@/components/page";
import { title } from "process";

interface Member { id: string; name: string; email: string; role: string; active: boolean }
interface Invite { id: string; email: string; role: string; expiresAt: string; acceptedAt: string | null }

export async function loader() {
	const [members, invites] = await Promise.all([
		api.get<{ items: Member[]; total: number }>("/members?limit=100"),
		api.get<{ items: Invite[]; total: number }>("/invites?limit=100"),
	]);
	return { members: members.data, invites: invites.data };
}

export async function action({ request }: Route.ActionArgs) {
	const form = await request.formData();
	try {
		if (form.get("intent") === "revoke") {
			await api.delete(`/invites/${form.get("id")}`);
			return { ok: true };
		}
		const response = await api.post("/invites", { email: String(form.get("email") ?? ""), role: String(form.get("role") ?? "MEMBER") });
		return { ok: true, inviteUrl: response.data.inviteUrl as string, delivered: response.data.delivered as boolean };
	} catch (error) {
		const message = isAxiosError(error) && typeof error.response?.data?.message === "string" ? error.response.data.message : "Não foi possível concluir a ação.";
		return data({ ok: false, error: message }, { status: 400 });
	}
}

export default function MembersAdmin() {
	const { members, invites } = useLoaderData<typeof loader>();
	const result = useActionData<typeof action>();
	const navigation = useNavigation();
	const pending = navigation.state === "submitting";


	// return <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
	// 	<header className="border-b pb-8"><h1 className="text-3xl font-extrabold tracking-[-0.03em]">Membros e convites</h1><p className="mt-2 text-muted-foreground">Controle quem participa da organização e qual papel cada pessoa recebe.</p></header>
	// 	<section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
	// 		<div>
	// 			<div className="flex items-center justify-between"><h2 className="text-xl font-bold">Equipe</h2><span className="text-sm font-semibold tabular-nums">{members.total} membros</span></div>
	// 			{members.items.length === 0 ? <div className="mt-5 rounded-[24px] border border-dashed p-10 text-center"><Users className="mx-auto size-8" /><p className="mt-3">A equipe ainda está vazia.</p></div> : <div className="mt-5 overflow-x-auto rounded-[24px] bg-card shadow-[0_20px_55px_-40px_rgba(26,26,26,0.45)]"><table className="w-full min-w-[560px] text-left text-sm"><thead className="border-b bg-muted/60"><tr><th className="px-5 py-4">Pessoa</th><th className="px-5 py-4">Papel</th><th className="px-5 py-4">Situação</th></tr></thead><tbody>{members.items.map((member) => <tr key={member.id} className="border-b last:border-0"><td className="px-5 py-4"><strong className="block">{member.name}</strong><span className="text-muted-foreground">{member.email}</span></td><td className="px-5 py-4">{member.role === "ADMIN" ? "Administrador" : member.role === "SUPER_ADMIN" ? "Superadministrador" : "Membro"}</td><td className="px-5 py-4">{member.active ? "Ativo" : "Inativo"}</td></tr>)}</tbody></table></div>}
	// 		</div>
	// 		<aside className="rounded-[24px] bg-[#1a1a1a] p-6 text-white shadow-[0_24px_65px_-38px_rgba(26,26,26,0.8)]">
	// 			<MailPlus className="size-8 text-primary" /><h2 className="mt-6 text-xl font-bold">Convidar alguém</h2><p className="mt-2 text-sm leading-6 text-white/70">O convite expira em 72 horas e concede acesso somente a esta organização.</p>
	// 			<Form method="post" className="mt-6 space-y-5">
	// 				<div className="space-y-2"><Label htmlFor="email" className="text-white">E-mail</Label><Input id="email" name="email" type="email" required className="h-11 rounded-[14px] bg-white text-[#1a1a1a]" /></div>
	// 				<div className="space-y-2"><Label htmlFor="role" className="text-white">Papel</Label><select id="role" name="role" className="h-11 w-full rounded-[14px] bg-white px-3 text-sm text-[#1a1a1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><option value="MEMBER">Membro</option><option value="ADMIN">Administrador</option></select></div>
	// 				<Button disabled={pending} className="h-11 w-full rounded-[14px] font-bold">{pending ? <LoaderCircle className="animate-spin" /> : <MailPlus />}Enviar convite</Button>
	// 			</Form>
	// 			{result && "error" in result && result.error && <p role="alert" className="mt-4 text-sm text-[#ff9caf]">{result.error}</p>}
	// 		</aside>
	// 	</section>
	// 	{result && "inviteUrl" in result && result.inviteUrl && <section className="mt-8 rounded-[24px] bg-primary/30 p-5"><h2 className="font-bold">Convite criado{result.delivered ? " e enviado" : ""}</h2><p className="mt-2 break-all text-sm">{result.inviteUrl}</p><Button type="button" variant="outline" size="sm" className="mt-4 rounded-[12px]" onClick={() => navigator.clipboard.writeText(result.inviteUrl!)}><Copy className="size-4" />Copiar link</Button></section>}
	// 	<section className="mt-10"><h2 className="text-xl font-bold">Convites recentes</h2>{invites.items.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">Nenhum convite registrado.</p> : <div className="mt-5 space-y-3">{invites.items.map((invite) => <div key={invite.id} className="flex flex-col gap-4 rounded-[18px] bg-card p-5 shadow-[0_16px_45px_-38px_rgba(26,26,26,0.5)] sm:flex-row sm:items-center"><div className="min-w-0 flex-1"><strong className="block truncate">{invite.email}</strong><p className="mt-1 text-sm text-muted-foreground">{invite.acceptedAt ? "Aceito" : `Expira em ${new Date(invite.expiresAt).toLocaleString("pt-BR")}`} · {invite.role}</p></div>{!invite.acceptedAt && <Form method="post"><input type="hidden" name="intent" value="revoke" /><input type="hidden" name="id" value={invite.id} /><Button variant="outline" size="sm" className="rounded-[12px]"><Trash2 className="size-4" />Revogar</Button></Form>}</div>)}</div>}</section>
	// </main>;
}
