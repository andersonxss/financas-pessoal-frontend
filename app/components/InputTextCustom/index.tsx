import { type ComponentProps, useEffect, useState } from "react";
import { DescricaoAlertValidate, LabelForm } from "@/components";
import { Input } from "@/components/ui/input";

interface InputTextCustomProps
	extends Omit<
		ComponentProps<typeof Input>,
		"name" | "type" | "defaultValue" | "value" | "onChange"
	> {
	name?: string;
	label?: string;
	type?: string;
	defaultValues?: Record<string, unknown>;
	validationErrors?: Record<string, string | string[] | undefined>;
}

const normalizeInputValue = (value: unknown) =>
	typeof value === "string" || typeof value === "number" ? value : "";

const InputTextCustom = (props: InputTextCustomProps) => {
	const {
		name = "",
		label = "",
		type = "text",
		defaultValues,
		validationErrors,
		...inputProps
	} = props;
	const [value, setValue] = useState<string | number>(() =>
		normalizeInputValue(defaultValues?.[name]),
	);

	useEffect(() => {
		setValue(normalizeInputValue(defaultValues?.[name]));
	}, [defaultValues, name]);

	const error = name && validationErrors ? validationErrors[name] : undefined;

	return (
		<div className="space-y-2">
			<LabelForm label={label} htmlFor={name} />
			<Input
				{...inputProps}
				id={name}
				type={type}
				name={name}
				{...(type === "file"
					? {}
					: {
							value: value ?? "",
							onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
								setValue(e.target.value),
						})}
				aria-invalid={Boolean(error)}
				className={error ? "border-destructive" : undefined}
			/>
			<DescricaoAlertValidate fieldErrors={error} />
		</div>
	);
};

export default InputTextCustom;
