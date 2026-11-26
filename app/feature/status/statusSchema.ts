import { z } from "zod";
export const statusSchema = z.object({
	name: z.string().nonempty("Status é campo obrigatório."),
});
