"use client";

import { CircleCheck, Save } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { InputSelectCustom } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { statusAbertoId } from "@/constants";
import type {
	DespesaProcessOption,
	FinancialProcessItem,
	FinancialProcessUpdate,
} from "@/interfaces";

interface DespesasFormsProcessDataProps {
	index: number;
	item: FinancialProcessItem;
	categorias: DespesaProcessOption[];
	parcelas: DespesaProcessOption[];
	pagamentos: DespesaProcessOption[];
	disabled?: boolean;
	onUpdate: (index: number, changes: FinancialProcessUpdate) => void;
}

interface EditableFields {
	descricao: string;
	categoria_id: string;
	pagamento_id: string;
	parcela_id: string;
}

interface ProcessSelectProps {
	id: string;
	label: string;
	value: string;
	options: DespesaProcessOption[];
	disabled: boolean;
	onValueChange: (value: string) => void;
}

const getEditableFields = (item: FinancialProcessItem): EditableFields => ({
	descricao: item.descricao ?? "",
	categoria_id: item.categoria_id ?? "",
	pagamento_id: item.tipo === "despesa" ? (item.pagamento_id ?? "") : "",
	parcela_id: item.tipo === "despesa" ? (item.parcela_id ?? "") : "",
});

const TemporariosForms = ({
	index,
	item,
	categorias,
	parcelas,
	pagamentos,
	disabled = false,
	onUpdate,
}: DespesasFormsProcessDataProps) => {
	const [formValues, setFormValues] = useState<EditableFields>(() =>
		getEditableFields(item),
	);
	const [descriptionError, setDescriptionError] = useState("");

	useEffect(() => {
		setFormValues(getEditableFields(item));
	}, [item]);

	const isDirty = useMemo(() => {
		const initialValues = getEditableFields(item);

		return Object.entries(formValues).some(
			([field, value]) =>
				value !== initialValues[field as keyof EditableFields],
		);
	}, [formValues, item]);

	const updateField = (field: keyof EditableFields, value: string) => {
		setFormValues((currentValues) => ({
			...currentValues,
			[field]: value,
		}));

		if (field === "descricao" && value.trim()) {
			setDescriptionError("");
		}
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const descricao = formValues.descricao.trim();

		if (!descricao) {
			setDescriptionError("Informe a descrição do lançamento.");
			return;
		}

		const commonChanges = {
			descricao,
			categoria_id: formValues.categoria_id,
			status_id: item.status_id || statusAbertoId,
			edit: true,
		};

		onUpdate(
			index,
			item.tipo === "despesa"
				? {
						...commonChanges,
						pagamento_id: formValues.pagamento_id,
						parcela_id: formValues.parcela_id,
					}
				: commonChanges,
		);
		setDescriptionError("");
	};

	const fieldId = (field: string) => `${field}-${item.clientId}`;

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<div className="space-y-2 sm:col-span-2">
					<Label htmlFor={fieldId("descricao")}>Descrição</Label>
					<Input
						id={fieldId("descricao")}
						value={formValues.descricao}
						disabled={disabled}
						aria-invalid={Boolean(descriptionError)}
						aria-describedby={
							descriptionError ? fieldId("descricao-error") : undefined
						}
						onChange={(event) => updateField("descricao", event.target.value)}
					/>
					{descriptionError && (
						<p
							id={fieldId("descricao-error")}
							className="text-destructive text-sm"
						>
							{descriptionError}
						</p>
					)}
				</div>

				{item.tipo === "despesa" && (
					<>
						<ProcessSelect
							id={fieldId("pagamento")}
							label="Tipo de pagamento"
							value={formValues.pagamento_id}
							options={pagamentos}
							disabled={disabled}
							onValueChange={(value) => updateField("pagamento_id", value)}
						/>
						<ProcessSelect
							id={fieldId("parcela")}
							label="Parcela"
							value={formValues.parcela_id}
							options={parcelas}
							disabled={disabled}
							onValueChange={(value) => updateField("parcela_id", value)}
						/>
					</>
				)}
				<div className="sm:col-span-2">
					<ProcessSelect
						id={fieldId("categoria")}
						label="Categoria"
						value={formValues.categoria_id}
						options={categorias}
						disabled={disabled}
						onValueChange={(value) => updateField("categoria_id", value)}
					/>
				</div>
			</div>

			<div className="flex items-center justify-between gap-3 border-t pt-4">
				<p
					className="text-muted-foreground flex min-h-5 items-center gap-1.5 text-xs"
					aria-live="polite"
				>
					{isDirty ? (
						"Alterações não salvas"
					) : item.edit ? (
						<>
							<CircleCheck
								className="size-4 text-lime-500"
								aria-hidden="true"
							/>
							Alterações salvas
						</>
					) : null}
				</p>
				<Button type="submit" disabled={disabled || !isDirty}>
					<Save aria-hidden="true" />
					Salvar alterações
				</Button>
			</div>
		</form>
	);
};

const ProcessSelect = ({
	id,
	label,
	value,
	options,
	disabled,
	onValueChange,
}: ProcessSelectProps) => (
	<InputSelectCustom
		name={id}
		label={label}
		value={value}
		options={options}
		optionValue="id"
		optionLabel="name"
		disabled={disabled}
		onValueChange={onValueChange}
	/>
);

export default TemporariosForms;
