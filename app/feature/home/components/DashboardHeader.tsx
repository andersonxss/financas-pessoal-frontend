import { Plus } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
	return (
		<header className="dashboard-heading">
			<div>
				<h1>Seu dinheiro, em perspectiva.</h1>
				<p>Um olhar claro sobre suas entradas, saídas e próximos passos.</p>
			</div>
			<Button asChild className="dashboard-primary h-11">
				<Link to="/despesas/create">
					<Plus aria-hidden="true" />
					Nova despesa
				</Link>
			</Button>
		</header>
	);
}
