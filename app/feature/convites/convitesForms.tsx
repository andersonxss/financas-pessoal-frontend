import { ButtonVoltarTela, Cards, ContainerFormButton, InputSelectCustom, InputTextCustom, SubmitButton, } from "@/components";
import type { IformConviteValueDefault } from "@/interfaces";
import { useActionData } from "react-router";


export default function ({ defaultValues }: IformConviteValueDefault) {
	const actionData = useActionData<{
		errors?: { fieldErrors?: { name?: string[]; role?: string[] } };
	}>();
	const validationErrors = actionData?.errors?.fieldErrors;

	return (
		<Cards>

			<InputTextCustom
				label="Email"
				name="email"
				defaultValues={defaultValues}
				validationErrors={validationErrors}
			/>
			<InputSelectCustom
				name="role"
				label="Papel"
				options={[{ id: "MEMBER", name: "Membro", }, { id: "ADMIN", name: "Administrador" }]}
				optionValue="id"
				optionLabel="name"
				defaultValues={defaultValues}
				validationErrors={validationErrors}
			/>
			<ContainerFormButton>
				<ButtonVoltarTela />
				<SubmitButton />
			</ContainerFormButton>
		</Cards>
	);
}
