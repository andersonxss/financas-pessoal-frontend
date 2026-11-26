import { Loader2 } from "lucide-react";

const LoaderTela = ({ blocked = false }: { blocked: boolean }) => {
	if (!blocked) return null;

	return (
		<div
			role="status"
			aria-live="polite"
			className="fixed inset-0 z-50 flex items-center justify-center bg-white/75"
		>
			<div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-bold shadow-[0_18px_45px_-24px_rgba(26,26,26,0.3)]">
				<Loader2 className="size-5 animate-spin text-[#78900F] motion-reduce:animate-none" />
				Carregando dados
			</div>
		</div>
	);
};

export default LoaderTela;
