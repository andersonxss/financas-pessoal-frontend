import { moneySchema } from "../../../utils/moneySchema";
import { z } from "zod";
// Schema for despesas validation

export const despesasSchema = z.object({
	descricao: z.string().nonempty("Pagamento é campo obrigatório."),
	valor: moneySchema,

	categoria_id: z.string().min(1, "Categoria é campo obrigatório."),
	parcela_id: z.string().min(1, "Parcela é campo obrigatório."),
	pagamento_id: z.string().min(1, "Pagamento é campo obrigatório."),
	vencimento: z.string().nonempty("Campo obrigatório."),
	status_id: z.string(),
});

export const despesasSchemaUpload = z.object({
	file: z
		.custom<File>(
			(value) => typeof File !== "undefined" && value instanceof File,
			"Selecione um arquivo PDF.",
		)
		.refine((file) => file.size > 0, "O arquivo está vazio.")
		.refine(
			(file) => file.size <= 5 * 1024 * 1024,
			"O arquivo deve ter no máximo 5 MB.",
		)
		.refine(
			(file) => file.type === "application/pdf",
			"Apenas arquivos PDF são permitidos.",
		),
	vencimento: z.string().nonempty("Campo obrigatório."),
	tipo: z.string().nonempty("Campo obrigatório."),
});
