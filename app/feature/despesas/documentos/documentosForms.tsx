"use client";
import { useActionData } from "react-router";
import {
	Cards, InputTextCustom, InputCalendarCustom, ContainerFormButton, ButtonVoltarTela, SubmitButton, InputSelectCustom,
} from "@/components";

type Iform = {

	defaultValues?: {
		file: string;
		vencimento: string;
		tipo: string;
	};
};

export default function documentosForms({ ...res }: Iform) {
	const actionData = useActionData<{ errors?: { fieldErrors?: { tipo?: string[]; vencimento?: string[]; file?: string[] } } }>();
	const tipoDespesaOptions = [
		{ id: "extracaoFaturaCartao", name: "Extração de dados" },
		// { id: "extracaoContaCorrente", name: "Extrato Conta-Corrente" },
		// { id: "extracaoPorIA", name: "Extração de dados por IA" },
	];
	return (
		<Cards>
			<InputSelectCustom
				label="Tipo"
				name="tipo"
				options={tipoDespesaOptions}
				optionValue="id"
				optionLabel="name"
				{...res}
				validationErrors={actionData?.errors?.fieldErrors}
			/>
			<InputCalendarCustom
				name="vencimento"
				label="Vencimento"
				{...res}
				validationErrors={actionData?.errors?.fieldErrors}
			/>
			<InputTextCustom
				label="Arquivo"
				aria-label="File"
				type="file"
				name="file"
				accept="application/pdf,.pdf"
				{...res}
				validationErrors={actionData?.errors?.fieldErrors}
			/>
			<ContainerFormButton>
				<ButtonVoltarTela />
				<SubmitButton />
			</ContainerFormButton>
		</Cards>

	);
}
