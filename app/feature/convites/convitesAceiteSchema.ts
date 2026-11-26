import { z } from "zod";

export const convitesAceiteSchema = z
	.object({
		token: z
			.string()
			.nonempty("Convite inválido.")
			.max(500, "Convite inválido."),
		name: z
			.string()
			.trim()
			.min(2, "O nome deve ter no mínimo 2 caracteres.")
			.max(120, "O nome deve ter no máximo 120 caracteres."),
		password: z
			.string()
			.nonempty("é campo obrigatório.")
			.min(6, "A senha deve ter no mínimo 6 caracteres.")
			.max(128, "A senha deve ter no máximo 128 caracteres.")
			.regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
			.regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
			.regex(
				/[^A-Za-z0-9\s]/,
				"A senha deve conter pelo menos um caractere especial.",
			),
		confirmation: z
			.string()
			.nonempty("é campo obrigatório.")
			.max(128, "A confirmação deve ter no máximo 128 caracteres."),
	})
	.refine(({ password, confirmation }) => password === confirmation, {
		message: "As senhas não coincidem.",
		path: ["confirmation"],
	});
