import {statusPagoId,statusAbertoId} from "@/constants";

export const filterByMonth = (data: {
	dados: [];
	mes: number;
	ano: number;
	campo: string;
}) => {
	const { dados, mes, ano, campo } = data;
	if (dados.length === 0) return [];
	const response: any = dados.filter((item: any) => {
		const dataVencimento = new Date(item[campo]);
		return (
			dataVencimento.getMonth() + 1 === mes &&
			dataVencimento.getFullYear() === ano
		);
	});
	return response;
};

export const somaDespesaTotal = (list: any[]) => {
	if (list.length === 0) return null;
	return list.reduce((accumulator: any, currentValue: any) => {
		const valor = currentValue.valor;
		
		const parsedValue =
			typeof valor === "string"
				? parseInt(valor) || 0
				: valor;
		return accumulator + parsedValue;
	}, 0);
};

export const somaReceitaTotal = (list: any[]) => {
	if (list.length === 0) return null;
	return list.reduce((accumulator: any, currentValue: any) => {
		const valor = currentValue.valor;
		const parsedValue =
			typeof valor === "string"
				? parseInt(valor) || 0
				: valor;
		return accumulator + parsedValue;
	}, 0);
};

export const somaDespesaAberto = (list: any[]) => {
	if (list.length === 0) return 0;
	return list
		.filter((e: any) => e.status_id === statusAbertoId)
		.reduce((accumulator: any, currentValue: any) => {
			const valor = currentValue.valor;
			const parsedValue =
				typeof valor === "string"
					? parseInt(valor) || 0
					: valor;
			return accumulator + parsedValue;
		}, 0);
};

export const somaDespesaPago = (list: any[]) => {
	if (list.length === 0) return 0;
	return list
		.filter((e: any) => e.status_id === statusPagoId)
		.reduce((accumulator: any, currentValue: any) => {
			const valor = currentValue.valor;
			const parsedValue =
				typeof valor === "string"
					? parseInt(valor) || 0
					: valor;
			return accumulator + parsedValue;
		}, 0);
};
