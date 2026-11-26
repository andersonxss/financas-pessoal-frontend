import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import api from "@/api";
import { useSocket } from "@/hooks";
import type { FinancialProcessItem } from "@/interfaces";

interface ProgressPayload {
	percent?: number;
	processados?: number;
	total?: number;
}

const useSetProcessDataHooks = () => {
	const { socket } = useSocket();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);

	const dataProcessed = useCallback((data: FinancialProcessItem[]) => {
		return data
			.filter((item) => item.active)
			.map((item) => {
				const base = {
					tipo: item.tipo,
					descricao: item.descricao.trim(),
					categoria_id: item.categoria_id,
					valor: Number(item.valor),
					status_id: item.status_id,
				};

				if (item.tipo === "receita") {
					return {
						...base,
						recebimento: item.recebimento,
					};
				}

				return {
					...base,
					pagamento_id: item.pagamento_id,
					parcela_id: item.parcela_id,
					vencimento: item.vencimento,
				};
			});
	}, []);

	const setProcessData = useCallback(
		async (data: FinancialProcessItem[]) => {
			const responseFormatData = dataProcessed(data);

			if (responseFormatData.length === 0) {
				toast.error("Selecione ao menos um lançamento para processar.");
				return;
			}

			const jobId = crypto.randomUUID();
			const handleProgress = (payload: ProgressPayload) => {
				const percent = Number(payload.percent);

				if (Number.isFinite(percent)) {
					setProgress(Math.min(100, Math.max(0, percent)));
				}
			};

			setLoading(true);
			setProgress(0);

			if (socket) {
				socket.emit("subscribe", jobId);
				socket.on("progress", handleProgress);
			}

			try {
				const response = await api.post("/despesas/temporias", {
					itens: JSON.stringify(responseFormatData),
					jobId,
				});

				setProgress(100);
				toast.success(
					response.data?.message ?? "Lançamentos enviados para processamento.",
				);
				await navigate("/despesas");
			} catch (error) {
				const message = axios.isAxiosError(error)
					? error.response?.data?.message || error.message
					: error instanceof Error
						? error.message
						: "Não foi possível processar os lançamentos.";

				toast.error(message);
			} finally {
				if (socket) {
					socket.off("progress", handleProgress);
				}
				setLoading(false);
				setProgress(0);
			}
		},
		[dataProcessed, navigate, socket],
	);

	return {
		loading,
		progress,
		setProcessData,
	};
};

export default useSetProcessDataHooks;
