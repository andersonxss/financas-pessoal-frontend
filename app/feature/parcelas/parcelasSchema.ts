import { z } from "zod";

export const parcelasSchema = z.object({
	name: z.string().nonempty("Parcela é campo obrigatório."),
	status_id: z.string(),
});
