import { useState } from "react";
import { useActionData } from "react-router";
import { Input } from "@/components/ui/input";
import { DescricaoAlertValidate, LabelForm } from "@/components";

interface InputCurrencyCustomProps {
	name: string;
	label: string;
	defaultValues?: any;
	validationErrors?: any;
}
const InputCurrencyCustom = (props: InputCurrencyCustomProps) => {
	const { name, label, defaultValues, validationErrors } = props;
	const [value, setValue] = useState<any>(defaultValues[name]);
	const error = validationErrors?.[name];
	return (
		<div className="mb-3">
			<LabelForm label={label} />
			<Input
				type="number"
				name={name}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="w-full mb-2 mt-2"
			/>
			<DescricaoAlertValidate fieldErrors={error} />
		</div>
	);
};

export default InputCurrencyCustom;
