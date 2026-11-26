"use client";

import { useActionData } from "react-router";
import {
	ButtonVoltarTela,
	Cards,
	ContainerFormButton,
	InputCalendarCustom,
	InputCurrencyCustom,
	InputSelectCustom,
	InputTextCustom,
	SubmitButton,
} from "@/components";
import type { ICategorias } from "@/interfaces/ICategorias";
import type {
	IReceitasActionData,
	IReceitasFormValues,
} from "@/interfaces/IReceitas";

interface ReceitasFormsProps {
	categorias: ICategorias[];
	defaultValues: IReceitasFormValues;
}

export default function ReceitasForms({
	categorias,
	defaultValues,
}: ReceitasFormsProps) {
	const actionData = useActionData<IReceitasActionData>();
	const fieldErrors = actionData?.errors?.fieldErrors;

	return (
		<Cards>
			<InputTextCustom
				type="hidden"
				name="status_id"
				defaultValues={defaultValues}
				validationErrors={fieldErrors}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				<InputTextCustom
					label="Descrição"
					name="descricao"
					defaultValues={defaultValues}
					validationErrors={fieldErrors}
				/>
				<InputSelectCustom
					label="Categoria"
					name="categoria_id"
					options={categorias}
					optionValue="id"
					optionLabel="name"
					defaultValues={defaultValues}
					validationErrors={fieldErrors}
				/>
				<InputCurrencyCustom
					name="valor"
					label="Valor"
					currency="BRL"
					locale="pt-BR"
					defaultValues={defaultValues}
					validationErrors={fieldErrors}
				/>
				<InputCalendarCustom
					name="recebimento"
					label="Recebimento"
					defaultValues={defaultValues}
					validationErrors={fieldErrors}
				/>
			</div>
			<ContainerFormButton>
				<ButtonVoltarTela />
				<SubmitButton />
			</ContainerFormButton>
		</Cards>
	);
}
