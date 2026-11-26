import { isAxiosError } from "axios";
import { Building2, LoaderCircle, Plus, Power } from "lucide-react";
import { data, Form, useActionData, useLoaderData, useNavigation } from "react-router";
import api from "@/api/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Route } from "./+types/tenants";

interface TenantItem { id: string; name: string; slug: string; active: boolean; createdAt: string }

export async function loader() {
	const response = await api.get<{ items: TenantItem[]; total: number }>("/tenants?limit=100");
	return response.data;
}

export async function action({ request }: Route.ActionArgs) {
	const form = await request.formData();
	try {
		if (form.get("intent") === "toggle") {
			await api.patch(`/tenants/${form.get("id")}`, { active: form.get("active") !== "true" });
			return { ok: true };
		}
		const response = await api.post("/tenants", {
			name: String(form.get("name") ?? ""),
			slug: String(form.get("slug") ?? ""),
			adminEmail: String(form.get("adminEmail") ?? ""),
		});
		return { ok: true, inviteUrl: response.data.invite.inviteUrl as string };
	} catch (error) {
		const message = isAxiosError(error) && typeof error.response?.data?.message === "string"
			? error.response.data.message
			: "Não foi possível salvar o tenant.";
		return data({ ok: false, error: message }, { status: 400 });
	}
}

export default function TenantsAdmin() {
	const { items, total } = useLoaderData<typeof loader>();
	const result = useActionData<typeof action>();
	const navigation = useNavigation();
	const busy = navigation.state === "submitting";
	return <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
		<header className="flex flex-col gap-4 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
			<div><h1 className="text-3xl font-extrabold tracking-[-0.03em]">Tenants</h1><p className="mt-2 text-muted-foreground">Crie organizações e entregue o primeiro acesso administrativo.</p></div>
			<p className="text-sm font-semibold tabular-nums">{total} {total === 1 ? "organização" : "organizações"}</p>
		</header>

		<section aria-labelledby="new-tenant" className="mt-8 rounded-[24px] bg-card p-5 shadow-[0_20px_55px_-38px_rgba(26,26,26,0.45)] md:p-7">
			<div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-[14px] bg-primary"><Plus className="size-5" /></span><div><h2 id="new-tenant" className="font-bold">Nova organização</h2><p className="text-sm text-muted-foreground">O administrador receberá um convite pelo Mailtrap.</p></div></div>
			<Form method="post" className="mt-6 grid gap-5 md:grid-cols-3">
				<div className="space-y-2"><Label htmlFor="name">Nome</Label><Input id="name" name="name" required className="h-11 rounded-[14px]" /></div>
				<div className="space-y-2"><Label htmlFor="slug">Identificador</Label><Input id="slug" name="slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="minha-empresa" required className="h-11 rounded-[14px]" /></div>
				<div className="space-y-2"><Label htmlFor="adminEmail">E-mail do administrador</Label><Input id="adminEmail" name="adminEmail" type="email" required className="h-11 rounded-[14px]" /></div>
				<div className="md:col-span-3 flex flex-wrap items-center gap-4"><Button disabled={busy} className="h-11 rounded-[14px] font-bold">{busy ? <LoaderCircle className="animate-spin" /> : <Plus />}Criar tenant</Button>{result && "error" in result && result.error && <p role="alert" className="text-sm font-medium text-destructive">{result.error}</p>}</div>
			</Form>
			{result && "inviteUrl" in result && result.inviteUrl && <p className="mt-5 break-all rounded-[14px] bg-muted p-4 text-sm"><strong>Link de convite:</strong> {result.inviteUrl}</p>}
		</section>

		<section aria-labelledby="tenant-list" className="mt-10">
			<h2 id="tenant-list" className="text-xl font-bold">Organizações cadastradas</h2>
			{items.length === 0 ? <div className="mt-5 rounded-[24px] border border-dashed p-10 text-center"><Building2 className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 font-semibold">Nenhum tenant cadastrado.</p></div> : <div className="mt-5 overflow-x-auto rounded-[24px] bg-card shadow-[0_20px_55px_-40px_rgba(26,26,26,0.45)]"><table className="w-full min-w-[680px] text-left text-sm"><thead className="border-b bg-muted/60"><tr><th className="px-5 py-4">Organização</th><th className="px-5 py-4">Identificador</th><th className="px-5 py-4">Situação</th><th className="px-5 py-4 text-right">Ação</th></tr></thead><tbody>{items.map((tenant) => <tr key={tenant.id} className="border-b last:border-0"><td className="px-5 py-4 font-semibold">{tenant.name}</td><td className="px-5 py-4 text-muted-foreground">{tenant.slug}</td><td className="px-5 py-4"><span className="rounded-full bg-muted px-3 py-1 text-xs font-bold">{tenant.active ? "Ativo" : "Inativo"}</span></td><td className="px-5 py-4 text-right"><Form method="post"><input type="hidden" name="intent" value="toggle" /><input type="hidden" name="id" value={tenant.id} /><input type="hidden" name="active" value={String(tenant.active)} /><Button variant="outline" size="sm" className="rounded-[12px]"><Power className="size-4" />{tenant.active ? "Desativar" : "Ativar"}</Button></Form></td></tr>)}</tbody></table></div>}
		</section>
	</main>;
}
