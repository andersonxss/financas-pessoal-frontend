import { z } from "zod";
import { moneySchema } from "../../../utils/moneySchema";

export const receitasSchema = z.object({
	descricao: z.string().trim().nonempty("Descrição é um campo obrigatório."),
	valor: moneySchema,
	categoria_id: z.uuid("Selecione uma categoria válida."),
	recebimento: z.iso.date("Informe uma data de recebimento válida."),
	status_id: z.uuid("Informe um status válido."),
});
