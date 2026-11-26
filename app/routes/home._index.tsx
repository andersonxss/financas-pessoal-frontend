import { data, type LoaderFunctionArgs, useLoaderData } from "react-router";
import {
	DashboardUnavailable,
	HomeDashboard,
	type HomeDashboardData,
} from "@/feature/home";
import type {
	CategoriaDespesaAnual,
	CategoriaDespesaMensal,
	RegistroFinanceiro,
	SerieMensal,
} from "@/interfaces";
import {
	getSomalTotalDespeasValoresService,
	getSomalTotalMesAnoReceitasService,
	getSomaTotalDespesasCategoriaMesService,
	getSomaTotalDespesasCategoriaService,
	getSomaTotalDespesasPagamentoService,
	getValorTotalDespesas,
} from "@/server";

function getDashboardYear(request: Request, currentYear: number) {
	const requestedYear = Number(new URL(request.url).searchParams.get("ano"));
	return Number.isInteger(requestedYear) &&
		requestedYear >= 2000 &&
		requestedYear <= currentYear + 1
		? requestedYear
		: currentYear;
}

export async function loader({ request }: LoaderFunctionArgs) {
	const currentYear = new Date().getFullYear();
	const ano = getDashboardYear(request, currentYear);

	try {
		const [
			despesas,
			receitas,
			saidas,
			categorias,
			categoriasMensais,
			pagamentos,
		] = await Promise.all([
			getValorTotalDespesas(),
			getSomalTotalMesAnoReceitasService(ano),
			getSomalTotalDespeasValoresService(ano),
			getSomaTotalDespesasCategoriaService(ano),
			getSomaTotalDespesasCategoriaMesService(ano),
			getSomaTotalDespesasPagamentoService(ano),
		]);

		if (
			![
				despesas,
				receitas,
				saidas,
				categorias,
				categoriasMensais,
				pagamentos,
			].every(Array.isArray)
		) {
			throw new Error("Invalid dashboard response");
		}

		return data<HomeDashboardData>({
			ano,
			currentYear,
			despesas: despesas as RegistroFinanceiro[],
			receitas: receitas as SerieMensal[],
			saidas: saidas as SerieMensal[],
			categorias: categorias as CategoriaDespesaAnual[],
			categoriasMensais: categoriasMensais as CategoriaDespesaMensal[],
			pagamentos,
			unavailable: false,
		});
	} catch {
		return data<HomeDashboardData>({
			ano,
			currentYear,
			despesas: [],
			receitas: [],
			saidas: [],
			categorias: [],
			categoriasMensais: [],
			pagamentos: [],
			unavailable: true,
		});
	}
}

export default function HomeIndexRoute() {
	return <HomeDashboard data={useLoaderData<typeof loader>()} />;
}

export function ErrorBoundary() {
	return (
		<main className="finance-dashboard" lang="pt-BR">
			<DashboardUnavailable onRetry={() => window.location.reload()} />
		</main>
	);
}
