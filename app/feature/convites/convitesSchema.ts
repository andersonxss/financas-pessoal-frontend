import { z } from "zod";

export const convitesSchema = z.object({
	email: z.string().email("Email inválido."),
	role: z.string().nonempty("Papel é campo obrigatório."),
});
