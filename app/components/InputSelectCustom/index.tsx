"use client";

import { Check, Search } from "lucide-react";
import { memo, useEffect, useId, useMemo, useRef, useState } from "react";
import { DescricaoAlertValidate, LabelForm } from "@/components";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
} from "@/components/ui/popover";

interface InputSelectCustomProps {
	name: string;
	label?: string;
	optionLabel: string;
	optionValue: string;
	options: object[];
	value?: string;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
	defaultValues?: Record<string, unknown>;
	onCloseAutoFocus?: (
		event: Event & { target: EventTarget & { value?: unknown } },
	) => void;
	validationErrors?: Record<string, string | string[] | undefined>;
}

const InputSelectCustom = (props: InputSelectCustomProps) => {
	const {
		name = "",
		label = "",
		options = [],
		optionLabel,
		optionValue,
	value,
	onValueChange,
		disabled = false,
		defaultValues,
		onCloseAutoFocus,
		validationErrors,
	} = props;

	const [selectedValue, setSelectedValue] = useState<Record<string, unknown>>(
		() => defaultValues ?? {},
	);
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const listboxId = useId();
	const valueRef = useRef(defaultValues?.[name]);
	const error = validationErrors?.[name];
	const selectedStateValue = value === undefined ? selectedValue[name] : value;
	const currentValue =
		selectedStateValue == null ? "" : String(selectedStateValue);

	const normalizedOptions = useMemo(
		() =>
			options.map((option) => {
				const optionData = option as Record<string, unknown>;
				return {
					value: String(optionData[optionValue] ?? ""),
					label: String(optionData[optionLabel] ?? ""),
				};
			}),
		[options, optionLabel, optionValue],
	);
	const selectedOption = normalizedOptions.find(
		(option) => option.value === currentValue,
	);
	const filteredOptions = normalizedOptions.filter((option) =>
		option.label
			.toLocaleLowerCase("pt-BR")
			.includes(query.trim().toLocaleLowerCase("pt-BR")),
	);

	useEffect(() => {
		if (value === undefined) {
			setSelectedValue(defaultValues ?? {});
			valueRef.current = defaultValues?.[name];
		}
	}, [name, defaultValues, value]);

	const handleOpenChange = (nextOpen: boolean) => {
		setOpen(nextOpen);
		if (!nextOpen) setQuery("");
	};
	const handleSelection = (selected: string) => {
		valueRef.current = selected;
		if (value === undefined) {
			setSelectedValue((previous) => ({ ...previous, [name]: selected }));
		}
		onValueChange?.(selected);
		handleOpenChange(false);
	};

	const handleCloseAutoFocus = (event: Event) => {
		if (!onCloseAutoFocus) return;
		const eventWithValue = event as Event & {
			target: EventTarget & { value?: unknown };
		};
		eventWithValue.target.value = valueRef.current;
		onCloseAutoFocus(eventWithValue);
	};

	return (
		<div className="space-y-2">
			<LabelForm label={label} htmlFor={name} />
			<Popover open={open} onOpenChange={handleOpenChange}>
				<PopoverAnchor asChild>
					<div className="relative">
						<Search
							aria-hidden="true"
							className="absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
						/>
						<Input
							id={name}
							value={open ? query : (selectedOption?.label ?? "")}
							onFocus={() => setOpen(true)}
							onChange={(event) => {
								setQuery(event.target.value);
								setOpen(true);
							}}
							onKeyDown={(event) => {
								if (event.key === "Escape") handleOpenChange(false);
								if (event.key === "Enter" && filteredOptions[0]) {
									event.preventDefault();
									handleSelection(filteredOptions[0].value);
								}
							}}
							placeholder="Selecione ou busque uma opção"
							aria-label={label || "Buscar opção"}
							role="combobox"
							aria-expanded={open}
							aria-controls={listboxId}
							aria-autocomplete="list"
							aria-invalid={Boolean(error)}
							autoComplete="off"
							disabled={disabled}
							className={error ? "border-destructive pl-9" : "pl-9"}
						/>
					</div>
				</PopoverAnchor>
				<PopoverContent
					align="start"
					className="w-[var(--radix-popover-trigger-width)] p-1"
					onOpenAutoFocus={(event) => event.preventDefault()}
					onCloseAutoFocus={handleCloseAutoFocus}
				>
					<div
						id={listboxId}
						role="listbox"
						aria-label={label || "Opções"}
						className="max-h-60 overflow-y-auto"
					>
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option) => (
								<button
									type="button"
									role="option"
									aria-selected={option.value === currentValue}
									key={option.value}
									onMouseDown={(event) => event.preventDefault()}
									onClick={() => {
										handleSelection(option.value);
									}}
									className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm outline-none hover:bg-secondary focus-visible:bg-secondary aria-selected:bg-secondary"
								>
									<Check
										aria-hidden="true"
										className={`size-4 shrink-0 ${option.value === currentValue ? "opacity-100" : "opacity-0"}`}
									/>
									<span className="truncate">{option.label}</span>
								</button>
							))
						) : (
							<p
								className="px-3 py-6 text-center text-sm text-muted-foreground"
								role="status"
							>
								Nenhuma opção encontrada.
							</p>
						)}
					</div>
				</PopoverContent>
			</Popover>
			<input type="hidden" name={name} value={currentValue} />
			<DescricaoAlertValidate fieldErrors={error} />
		</div>
	);
};

export default memo(InputSelectCustom);
