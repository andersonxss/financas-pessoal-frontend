import { CalendarDays, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface DashboardToolbarProps {
	year: number;
	years: number[];
	loading: boolean;
	onYearChange: (year: string) => void;
	onRefresh: () => void;
}

export function DashboardToolbar({
	year,
	years,
	loading,
	onYearChange,
	onRefresh,
}: DashboardToolbarProps) {
	return (
		<div className="dashboard-toolbar">
			<div className="flex items-center gap-3">
				<CalendarDays className="size-4" aria-hidden="true" />
				<span className="font-medium">Visão anual</span>
				<span className="dashboard-toolbar-note">Janeiro a dezembro</span>
			</div>
			<div className="flex items-center gap-2">
				<Select
					value={String(year)}
					disabled={loading}
					onValueChange={onYearChange}
				>
					<SelectTrigger aria-label="Ano do relatório" className="h-11 w-28">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{years.map((yearOption) => (
							<SelectItem key={yearOption} value={String(yearOption)}>
								{yearOption}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
					variant="outline"
					className="size-11"
					aria-label="Atualizar dados"
					disabled={loading}
					onClick={onRefresh}
				>
					<RefreshCw className="size-4" aria-hidden="true" />
				</Button>
			</div>
		</div>
	);
}
