"use client";
import { useActionData } from "react-router";
import { ButtonVoltarTela, Cards, ContainerFormButton, InputCalendarCustom, InputCurrencyCustom, InputSelectCustom, InputTextCustom, SubmitButton } from "@/components";
import { pagamentoAvista, pagamentoPix, parcela1px } from "@/constants";
import { useCallback, useState } from "react";
import type { ICategorias, IPagamentos, IParcelas } from "@/interfaces";

type Iform = {
	categorias: ICategorias[];
	parcelas: IParcelas[];
	pagamentos: IPagamentos[];
	defaultValues?: {
		categoria_id: string;
		pagamento_id: string;
		parcela_id: string;
		descricao: string;
		valor: number | string;
		vencimento: string | Date;
		status_id: string;
	};
};

export default function ({ categorias, parcelas, pagamentos, ...res }: Iform) {
	const [stateTipoPagamento, setStateTipoPagamento] = useState(false);
	const actionData = useActionData<{ errors?: { fieldErrors?: { name?: string[]; status_id?: string[] } } }>();
	const checkTipoPagamento = useCallback((id: any) => { setStateTipoPagamento(id === pagamentoAvista || id === pagamentoPix); }, []);

	return (

		<Cards>

			<InputTextCustom
				type="hidden"
				name="status_id"
				{...res}
				validationErrors={actionData?.errors?.fieldErrors}
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">


				<InputSelectCustom
					name="pagamento_id"
					label="Tipo de Pagamento"
					options={pagamentos}
					optionValue="id"
					optionLabel="name"
					onCloseAutoFocus={(e: any) => {
						checkTipoPagamento(e.target.value);
					}}
					{...res}
					validationErrors={actionData?.errors?.fieldErrors}
				/>
				{stateTipoPagamento ? (
					<InputTextCustom
						type="hidden"
						name="parcela_id"
						{...res}
						defaultValues={{ parcela_id: parcela1px }}
					/>
				) : (
					<InputSelectCustom
						name="parcela_id"
						label="Parcela"
						options={parcelas}
						optionValue="id"
						optionLabel="name"
						{...res}
						validationErrors={actionData?.errors?.fieldErrors}
					/>
				)}

			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">

				<InputTextCustom
					label="Descrição"
					name="descricao"
					{...res}
					validationErrors={actionData?.errors?.fieldErrors}

				/>

				<InputSelectCustom
					label="Categoria"
					name="categoria_id"
					options={categorias}
					optionValue="id"
					optionLabel="name"
					{...res}
					validationErrors={actionData?.errors?.fieldErrors}
				/>

				<InputCurrencyCustom
					name="valor"
					label="Valor"
					currency="BRL"
					locale="pt-BR"
					{...res}
					validationErrors={actionData?.errors?.fieldErrors}

				/>

				<InputCalendarCustom
					name="vencimento"
					label="Vencimento"
					{...res}
					validationErrors={actionData?.errors?.fieldErrors}

				/>
			</div>

			<ContainerFormButton>
				<ButtonVoltarTela />
				<SubmitButton />
			</ContainerFormButton>
		</Cards>

	);
}
