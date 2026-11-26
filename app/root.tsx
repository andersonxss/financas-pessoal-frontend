import type React from "react";
import { isAxiosError } from "axios";
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	redirect,
	Scripts,
	ScrollRestoration,
	useFetcher,
	useLocation,
	useNavigation,
} from "react-router";
import { LoaderTela } from "@/components";
import AppSidebarLayout from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { getActionErrorMessage } from "@/utils/actionError";
import type { Route } from "./+types/root";
import { SocketProvider } from "./contexts/SocketContext";
import api from "@/api/server";
import {
	appendCapturedCookies,
	withRequestContext,
} from "@/auth/request-context.server";
import "./app.css";

export interface SessionUser {
	userId: string;
	tenantId: string;
	email: string;
	name: string;
	role: "SUPER_ADMIN" | "ADMIN" | "MEMBER";
}

const publicPaths = ["/login", "/recuperar-senha", "/reset-password", "/aceitar-convite"];

export const middleware: Route.MiddlewareFunction[] = [
	async ({ request }, next) =>
		withRequestContext(request, async () => appendCapturedCookies(await next())),
];

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	if (publicPaths.some((path) => url.pathname.startsWith(path))) return { user: null };
	try {
		const response = await api.get<SessionUser>("/auth/me");
		return { user: response.data };
	} catch {
		const target = `${url.pathname}${url.search}`;
		throw redirect(`/login?redirectTo=${encodeURIComponent(target)}`);
	}
}

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	const navigation = useNavigation();
	const location = useLocation();
	const fetcher = useFetcher();
	const isPublic = publicPaths.some((path) => location.pathname.startsWith(path));
	const content = isPublic ? (
		children
	) : (
		<AppSidebarLayout
			onSignOut={() => fetcher.submit(null, { method: "post", action: "/logout" })}
		>
			<SocketProvider>{children}</SocketProvider>
		</AppSidebarLayout>
	);
	return (
		<html lang="pt-BR">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{navigation.state === "loading" && <LoaderTela blocked={true} />}
				{content}
				<Toaster theme="light" position="top-center" richColors />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Não foi possível abrir esta tela";
	let details =
		"Ocorreu um problema ao carregar as informações. Tente novamente em alguns instantes.";

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "Página não encontrada" : message;
		details =
			error.status === 404
				? "Confira o endereço ou volte à página inicial para continuar."
				: details;
	}
	if (
		isRouteErrorResponse(error) &&
		error.data &&
		typeof error.data === "object"
	) {
		const routeData = error.data as {
			formError?: unknown;
			message?: unknown;
		};
		if (typeof routeData.formError === "string") details = routeData.formError;
		else if (typeof routeData.message === "string") details = routeData.message;
	} else if (isAxiosError(error)) {
		details = getActionErrorMessage(error, {
			resource: "as informações desta tela",
			operation: "carregar",
		});
	}

	return (
		<div className="p-4 md:p-8">
			<section
				aria-labelledby="page-error-title"
				className="mx-auto max-w-xl rounded-3xl bg-card p-6 text-card-foreground shadow-[0_18px_45px_-28px_rgba(26,26,26,0.35)] md:p-8"
			>
				<div role="alert">
					<h1 id="page-error-title" className="text-xl font-semibold">
						{message}
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">{details}</p>
				</div>
				<div className="mt-6 flex flex-wrap gap-3">
					<Button type="button" onClick={() => window.location.reload()}>
						Tentar novamente
					</Button>
					<Button asChild variant="outline">
						<a href="/">Ir para o início</a>
					</Button>
				</div>
			</section>
		</div>
	);
}
