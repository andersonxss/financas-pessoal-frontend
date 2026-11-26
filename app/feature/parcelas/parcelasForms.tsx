import { ButtonVoltarTela, Cards, ContainerFormButton, InputTextCustom, SubmitButton, } from "@/components";
import { useActionData } from "react-router";


type IformPagamento = {
	defaultValues?: {
		name: string;
		status_id: string;
	};
}

export default function ({ defaultValues }: IformPagamento) {
	const actionData = useActionData<{
		errors?: { fieldErrors?: { name?: string[]; status_id?: string[] } };
	}>();
	const validationErrors = actionData?.errors?.fieldErrors;

	return (
		<Cards>
			<InputTextCustom
				type="hidden"
				name="status_id"
				defaultValues={defaultValues}
				validationErrors={validationErrors}
			/>
			<InputTextCustom
				label="Tipo de Pagamento"
				name="name"
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
