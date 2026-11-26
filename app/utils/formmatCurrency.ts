export const formatCurrency = (number: number | null | undefined) => {
	const options: any = {
		style: "currency",
		currency: "BRL",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	};
	const formatNumber = new Intl.NumberFormat("pt-BR", options);
	if (!number) return formatNumber.format(0);
	return formatNumber.format(number);
};
