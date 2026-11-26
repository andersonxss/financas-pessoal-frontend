import { useActionData } from "react-router";
import { ButtonVoltarTela, Cards, ContainerFormButton, InputTextCustom, SubmitButton } from "@/components";

type IformPagamento = {
	defaultValues?: {
		name: string;
	};
}

export default function ({ defaultValues }: IformPagamento) {
	const actionData = useActionData<{
		errors?: { fieldErrors?: { name?: string[]; } };
	}>();
	const validationErrors = actionData?.errors?.fieldErrors;
	return (
		<Cards>
			<InputTextCustom
				label="Status"
				name="name"
				defaultValues={defaultValues}
				validationErrors={validationErrors}
			/>
			<ContainerFormButton>
				<ButtonVoltarTela to="/status" />
				<SubmitButton />
			</ContainerFormButton>
		</Cards>
	);
}