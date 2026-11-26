import { useNavigation, useRevalidator, useSearchParams } from "react-router";
import { AnnualOverviewChart } from "./components/AnnualOverviewChart";
import { CategoryExpensesChart } from "./components/CategoryExpensesChart";
import {
	DashboardSkeleton,
	DashboardUnavailable,
} from "./components/DashboardFeedback";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardInsights } from "./components/DashboardInsights";
import { DashboardSummary } from "./components/DashboardSummary";
import { DashboardToolbar } from "./components/DashboardToolbar";
import { MonthlyCategoryExpensesChart } from "./components/MonthlyCategoryExpensesChart";
import { PaymentMethodExpensesChart } from "./components/PaymentMethodExpensesChart";
import type { HomeDashboardData } from "./home.types";
import { buildHomeDashboardViewModel } from "./utils/buildHomeDashboardViewModel";
import "./dashboard.css";

export function HomeDashboard({ data }: { data: HomeDashboardData }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigation = useNavigation();
	const revalidator = useRevalidator();
	const loading = navigation.state !== "idle" || revalidator.state !== "idle";
	const viewModel = buildHomeDashboardViewModel(data);

	function handleYearChange(year: string) {
		const nextSearchParams = new URLSearchParams(searchParams);
		nextSearchParams.set("ano", year);
		setSearchParams(nextSearchParams, { preventScrollReset: true });
	}

	function refreshDashboard() {
		revalidator.revalidate();
	}

	return (
		<main className="finance-dashboard" lang="pt-BR">
			<DashboardHeader />
			<DashboardToolbar
				year={viewModel.year}
				years={viewModel.years}
				loading={loading}
				onYearChange={handleYearChange}
				onRefresh={refreshDashboard}
			/>
			{loading ? (
				<DashboardSkeleton />
			) : data.unavailable ? (
				<DashboardUnavailable onRetry={refreshDashboard} />
			) : (
				<div className="dashboard-content">
					<DashboardSummary year={viewModel.year} summary={viewModel.summary} />
					<div className="dashboard-grid">
						<AnnualOverviewChart
							year={viewModel.year}
							months={viewModel.months}
							hasData={viewModel.hasData}
						/>
						{/* <ExpenseStatusPanel
							hasExpenses={data.despesas.length > 0}
							status={viewModel.expenseStatus}
						/> */}
					</div>

					<CategoryExpensesChart
						year={viewModel.year}
						summary={viewModel.categoryExpenses}
					/>


					<div className="dashboard-category-grid">
						<PaymentMethodExpensesChart
							year={viewModel.year}
							summary={viewModel.paymentExpenses}
						/>
						<MonthlyCategoryExpensesChart
							year={viewModel.year}
							summary={viewModel.monthlyCategoryExpenses}
						/>
					</div>
					<DashboardInsights
						hasData={viewModel.hasData}
						summary={viewModel.summary}
					/>
				</div>
			)}
		</main>
	);
}
