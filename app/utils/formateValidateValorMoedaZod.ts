export const formateValidateValorMoedaZod = async (z: any) => {
	return await z.string().transform(async (val: any, ctx: any) => {
		if (typeof val !== "string") {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "O valor deve ser uma string no formato R$ 1.234,56",
			});
			return z.NEVER;
		}

		// Remove "R$" e qualquer espaço em branco
		let value = val.replace(/\s|R\$/g, "");

		// Remove pontos de milhar e substitui a vírgula decimal por ponto
		value = value.replace(/\./g, "").replace(",", ".");

		// Converte para número
		const numericValue = parseFloat(value);

		if (isNaN(numericValue)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Valor inválido",
			});
			return z.NEVER;
		}

		return numericValue;
	});
};
