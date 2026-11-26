import { useActionData } from "react-router";
import { InputTextCustom } from "@/components";
import type { IFormResetPassWord } from "@/interfaces";

export default function AuthFormsResetForm({
	defaultValues,
}: IFormResetPassWord) {
	const actionData = useActionData<{
		errors?: {
			fieldErrors?: {
				token?: string | string[];
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
				label="Senha"
				name="password"
				type="password"
				autoComplete="new-password"
				minLength={6}
				maxLength={128}
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
				defaultValues={defaultValues}
				validationErrors={validationErrors}
			/>
		</>
	);
}
