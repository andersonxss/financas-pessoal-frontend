import { useEffect, useState } from "react";
import { DescricaoAlertValidate, LabelForm } from "@/components";
import { Input } from "@/components/ui/input";

interface InputCurrencyCustomProps {
	name: string;
	label: string;
	defaultValues?: Record<string, unknown>;
	currency?: string;
	locale?: string;
	validationErrors?: Record<string, string | string[] | undefined>;
}

const formatCurrencyValue = (value: number, locale: string, currency: string) =>
	new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);

const InputCurrencyCustom = (props: InputCurrencyCustomProps) => {
	const {
		name = "",
		label = "",
		defaultValues,
		currency = "BRL",
		locale = "pt-BR",
		validationErrors,
	} = props;

	const [displayValue, setDisplayValue] = useState("");
	const [rawValue, setRawValue] = useState<number | string>("");

	// Initialize values
	useEffect(() => {
		const initialValue = defaultValues?.[name];
		if (
			initialValue !== undefined &&
			initialValue !== null &&
			initialValue !== ""
		) {
			const numValue = Number(initialValue);
			if (!Number.isNaN(numValue)) {
				setRawValue(numValue);
				setDisplayValue(formatCurrencyValue(numValue, locale, currency));
			}
		}
	}, [defaultValues, name, locale, currency]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		// Remove non-numeric characters except for the decimal separator (if needed, but simpler to just strip all non-digits)
		// For BRL/pt-BR, we want to treat it as cents.
		// Example: User types "1", we show "R$ 0,01". Types "12", "R$ 0,12".

		const digits = inputValue.replace(/\D/g, "");

		if (digits === "") {
			setDisplayValue("");
			setRawValue("");
			return;
		}

		const numberValue = Number(digits) / 100;

		setRawValue(numberValue);
		setDisplayValue(formatCurrencyValue(numberValue, locale, currency));
	};

	const error = validationErrors?.[name];
	return (
		<div className="space-y-2">
			<LabelForm label={label} htmlFor={name} />
			<Input
				id={name}
				type="text"
				value={displayValue}
				onChange={handleChange}
				aria-invalid={Boolean(error)}
				className={error ? "border-destructive" : undefined}
				placeholder={formatCurrencyValue(0, locale, currency)}
			/>
			{/* Hidden input to submit the raw numeric value */}
			<input type="hidden" name={name} value={rawValue} />
			<DescricaoAlertValidate fieldErrors={error} />
		</div>
	);
};

export default InputCurrencyCustom;
