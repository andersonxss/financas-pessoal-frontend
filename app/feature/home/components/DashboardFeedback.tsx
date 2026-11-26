import { CircleAlert, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
	return (
		<div
			role="status"
			aria-live="polite"
			aria-busy="true"
			className="space-y-8 py-8"
		>
			<span className="sr-only">Carregando dados financeiros…</span>
			<div className="grid gap-6 sm:grid-cols-3">
				{[1, 2, 3].map((item) => (
					<Skeleton key={item} className="h-24 motion-reduce:animate-none" />
				))}
			</div>
			<Skeleton className="h-96 w-full motion-reduce:animate-none" />
		</div>
	);
}

export function DashboardUnavailable({ onRetry }: { onRetry: () => void }) {
	return (
		<section role="alert" className="dashboard-empty dashboard-error">
			<CircleAlert className="size-8" aria-hidden="true" />
			<h2>Não foi possível carregar seu resumo.</h2>
			<p>
				Seus dados não foram alterados. Tente novamente em alguns instantes.
			</p>
			<Button variant="outline" className="h-11" onClick={onRetry}>
				<RefreshCw aria-hidden="true" />
				Tentar novamente
			</Button>
		</section>
	);
}
