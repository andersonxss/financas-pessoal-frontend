import { useActionData } from "react-router";
import {
	ButtonVoltarTela,
	Cards,
	ContainerFormButton,
	InputTextCustom,
	SubmitButton,
} from "@/components";
import { breadCrumbPagamentos } from "@/constants/pagamentos";
import type { IformPagamento } from "@/interfaces/IPagamentos";

export default function PagamentosForms({ defaultValues }: IformPagamento) {
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
				<ButtonVoltarTela to={breadCrumbPagamentos.home.redirect} />
				<SubmitButton />
			</ContainerFormButton>
		</Cards>
	);
}
