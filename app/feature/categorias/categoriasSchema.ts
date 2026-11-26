import { z } from "zod";

export const categoriasSchema = z.object({
	name: z.string().nonempty("Categoria é campo obrigatório."),
	status_id: z.string().uuid("Selecione um status válido."),
});
