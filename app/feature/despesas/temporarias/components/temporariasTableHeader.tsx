import { ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { FinancialProcessItem } from "@/interfaces";
import useSetProcessDataHooks from "../../hooks/useSetProcessDataHooks";
import ProgressData from "./progressData";

type IProps = {
	activeCount: number;
	checkItem: boolean;
	data: Array<FinancialProcessItem>;
};

const TemporariasTableHeader = ({ activeCount, data, checkItem }: IProps) => {
	const { loading, progress, setProcessData } = useSetProcessDataHooks();
	const activeItemLabel = activeCount === 1 ? "lançamento" : "lançamentos";
	const selectedItemLabel =
		activeCount === 1 ? "lançamento selecionado" : "lançamentos selecionados";
	return (
		<>
			<ProgressData loading={loading} progress={progress} />
			<div className="bg-card flex flex-col gap-4 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
				<div className="min-w-0">
					<h2 id="review-financial-title" className="text-base font-semibold">
						Revise os lançamentos encontrados
					</h2>
					<p className="text-muted-foreground mt-1 text-sm">
						{activeCount} {selectedItemLabel} de {data.length}.
					</p>
				</div>

				<Button
					type="button"
					size="lg"
					className="w-full sm:w-auto"
					disabled={loading || checkItem}
					onClick={() => {
						void setProcessData(data);
					}}
				>
					{loading ? (
						<>
							<Spinner />
							Processando...
						</>
					) : (
						<>
							<ReceiptText aria-hidden="true" />
							Processar {activeCount} {activeItemLabel}
						</>
					)}
				</Button>
			</div>
		</>
	);
};

export default TemporariasTableHeader;
