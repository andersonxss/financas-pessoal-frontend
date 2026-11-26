import { useActionData } from "react-router";
import { InputTextCustom } from "@/components";
import type { IformConviteAceiteValueDefault } from "@/interfaces";

export default function ConvitesAceiteForms({
	defaultValues,
}: IformConviteAceiteValueDefault) {
	const actionData = useActionData<{
		errors?: {
			fieldErrors?: {
				token?: string | string[];
				name?: string | string[];
				password?: string | string[];
				confirmation?: string | string[];
			};
		};
	}>();
	const validationErrors = actionData?.errors?.fieldErrors;

	return (
		<>
			<InputTextCustom
				type="hidden"
				name="token"
				defaultValues={defaultValues}
				validationErrors={validationErrors}
			/>

			<InputTextCustom
				label="Nome"
				name="name"
				autoComplete="name"
				minLength={2}
				maxLength={120}
				required
				defaultValues={defaultValues}
				validationErrors={validationErrors}
			/>

			<InputTextCustom
				label="Senha"
				name="password"
				type="password"
				autoComplete="new-password"
				minLength={6}
				maxLength={128}
				required
				defaultValues={defaultValues}
				validationErrors={validationErrors}
			/>
			<InputTextCustom
				label="Confirme a senha"
				name="confirmation"
				type="password"
				autoComplete="new-password"
				minLength={6}
				maxLength={128}
				required
				defaultValues={defaultValues}
				validationErrors={validationErrors}
			/>
		</>
	);
}
