import {
	ButtonVoltarTela,
	Cards,
	ContainerFormButton,
	InputTextCustom,
	SubmitButton,
} from "@/components";
import { breadCrumbCategorias } from "@/constants";
import { useActionData } from "react-router";

type Iform = {
	defaultValues?: {
		name: string;
		status_id: string;
	};
};

const CategoriasForms = ({ ...res }: Iform) => {
	const actionData = useActionData<{
		errors?: { fieldErrors?: { name?: string[]; status_id?: string[] } };
	}>();
	return (
		<Cards>
			<InputTextCustom
				type="hidden"
				name="status_id"
				{...res}
				validationErrors={actionData?.errors?.fieldErrors}
			/>
			<InputTextCustom
				label="Categoria"
				name="name"
				{...res}
				validationErrors={actionData?.errors?.fieldErrors}
			/>
			<ContainerFormButton>
				<ButtonVoltarTela />
				<SubmitButton />
			</ContainerFormButton>
		</Cards>
	);
};
export default CategoriasForms;
