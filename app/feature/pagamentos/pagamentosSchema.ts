import { z } from "zod";

export const pagamentosSchema = z.object({
	name: z.string().nonempty("Campo obrigatório."),
	status_id: z.string().uuid("Selecione um status válido."),
});
