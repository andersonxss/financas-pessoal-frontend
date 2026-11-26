import type { ReactNode } from "react";
import { Landmark, LockKeyhole, ShieldCheck } from "lucide-react";

interface AuthShellProps {
	title: string;
	description: string;
	children: ReactNode;
}

export function AuthShell({ title, description, children }: AuthShellProps) {
	return (
		<main className="grid min-h-svh bg-[#f7f9fa] lg:grid-cols-2" lang="pt-BR">
			<section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-16">
				<div className="w-full max-w-md">
					<a href="/login" className="mb-12 inline-flex items-center gap-3 font-extrabold tracking-[-0.02em]">
						<span className="flex size-10 items-center justify-center rounded-[14px] bg-primary">
							<Landmark className="size-5" aria-hidden="true" />
						</span>
						Finance Sistem
					</a>
					<header className="mb-8">
						<h1 className="text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-4xl">{title}</h1>
						<p className="mt-3 max-w-[60ch] text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
					</header>
					{children}
				</div>
			</section>

			<aside className="relative hidden min-h-svh overflow-hidden bg-[#1a1a1a] p-10 text-white lg:flex lg:items-end lg:p-14" aria-label="Segurança e organização">
				<div className="absolute -right-24 -top-20 size-[26rem] rounded-full bg-[#d0f644]" />
				<div className="absolute right-24 top-32 size-44 rotate-12 rounded-[32px] bg-[#ff6584] shadow-[0_28px_70px_-28px_rgba(255,101,132,0.75)]" />
				<div className="absolute left-14 top-20 grid size-32 place-items-center rounded-[32px] border border-white/15 bg-white/10">
					<LockKeyhole className="size-12" aria-hidden="true" />
				</div>
				<div className="relative z-10 max-w-lg rounded-[32px] bg-white p-8 text-[#1a1a1a] shadow-[0_30px_90px_-42px_rgba(0,0,0,0.9)]">
					<ShieldCheck className="size-8 text-[#879f24]" aria-hidden="true" />
					<h2 className="mt-8 text-3xl font-extrabold tracking-[-0.03em] text-balance">Cada organização no seu próprio espaço.</h2>
					<p className="mt-4 leading-7 text-[#526066]">Acesso por papel, sessões rotacionadas e isolamento de dados no banco mantêm cada decisão financeira dentro da fronteira correta.</p>
				</div>
			</aside>
		</main>
	);
}
