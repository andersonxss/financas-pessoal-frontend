"use client";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import DescricaoAlertValidate from "../DescricaoAlertValidate";
import LabelForm from "../LabelForm";

const parseLocalDate = (value: unknown): Date | undefined => {
	if (!value) return undefined;
	if (value instanceof Date) return value;
	if (typeof value === "string") {
		const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
		if (match) {
			return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
		}
	}

	const parsed = new Date(String(value));
	return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const InputCalendarCustom = ({
	name,
	label,
	defaultValues,
	validationErrors,
}: {
	name: string;
	label: string;
	defaultValues?: Record<string, unknown>;
	validationErrors?: Record<string, string[] | undefined>;
}) => {
	const data = defaultValues?.[name];
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>(() =>
		parseLocalDate(data),
	);
	const error = validationErrors?.[name];

	React.useEffect(() => {
		setDate(parseLocalDate(defaultValues?.[name]));
	}, [defaultValues, name]);

	return (
		<div className="space-y-2">
			<LabelForm label={label} htmlFor={name} />
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id={name}
						aria-invalid={Boolean(error)}
						className="w-full justify-between font-medium"
					>
						{date ? date.toLocaleDateString("pt-BR") : "Selecione uma data"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className={`w-auto overflow-hidden p-0`} align="start">
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						onSelect={(date) => {
							setDate(date);
							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>
			<DescricaoAlertValidate fieldErrors={error} />
			<input
				type="hidden"
				name={name}
				value={date ? format(date, "yyyy-MM-dd") : ""}
			/>
		</div>
	);
};
export default InputCalendarCustom;
