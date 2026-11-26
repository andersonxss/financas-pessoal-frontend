export const progressParcelas = (descricao: string) => {
	const text = descricao.replaceAll(" ", "-").split("-").pop();
	if (!text) return;
	const [parcela1, parcela2] = text.split("/");

	const porcetagemParcela = calcularProximidade(
		parseInt(parcela1),
		parseInt(parcela2),
	);
	if (porcetagemParcela === 100) {
		return {
			color: "text-black",
			bg: "bg-lime-500",
		};
	}
	if (porcetagemParcela > 10 && porcetagemParcela <= 20) {
		return {
			color: "text-black",
			bg: "bg-red-400",
		};
	}
	if (porcetagemParcela > 30 && porcetagemParcela <= 50) {
		return {
			color: "text-black",
			bg: "bg-red-300",
		};
	}
	if (porcetagemParcela > 50 && porcetagemParcela <= 70) {
		return {
			color: "text-black",
			bg: "bg-amber-500",
		};
	}
	if (porcetagemParcela > 70 && porcetagemParcela <= 90) {
		return {
			color: "text-black",
			bg: "bg-lime-600",
		};
	}
};

function calcularProximidade(v1: number, v2: number) {
	if (v1 === v2) {
		return 100.0;
	}

	const diferenca = Math.abs(v1 - v2);
	const maximo = Math.max(Math.abs(v1), Math.abs(v2));

	if (maximo === 0) {
		return 100.0; // Ambos são zero
	}

	const percentualDiferenca = (diferenca / maximo) * 100;
	const proximidade = 100 - percentualDiferenca;
	return proximidade;
}
