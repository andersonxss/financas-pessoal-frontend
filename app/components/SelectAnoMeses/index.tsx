import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { anos, meses } from "@/constants";
import { useSelectAnoMeses } from "@/hooks";

const SelectAnoMeses = ({ route }: { route: string }) => {
	const navigate = useNavigate();
	const { ano, countMeses } = useSelectAnoMeses();

	const updatePeriod = useCallback(
		(newAno: number, newMonthIdx: number) => {
			navigate(`/${route}/${newAno}/${meses[newMonthIdx].id}`);
		},
		[navigate, route],
	);

	return (
		<ButtonGroup>
			<Button
				variant="secondary"
				size="icon"
				aria-label="Mês anterior"
				disabled={countMeses === 0}
				onClick={() => {
					updatePeriod(ano, countMeses - 1);
				}}
			>
				<ChevronLeft />
			</Button>
			<Select
				value={String(ano)}
				onValueChange={(value) => {
					updatePeriod(Number(value), countMeses);
				}}
			>
				<SelectTrigger className="w-[104px] sm:w-[140px]">
					<SelectValue placeholder={ano} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{anos.length > 0 &&
							anos.map((ano) => {
								return (
									<SelectItem key={ano.name} value={ano.name}>
										{ano.name}
									</SelectItem>
								);
							})}
					</SelectGroup>
				</SelectContent>
			</Select>
			<ButtonGroupSeparator />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" className="w-20 sm:w-24">
						<b>{meses[countMeses].name}</b>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>Meses</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{meses.length > 0 &&
						meses.map((mes) => {
							return (
								<DropdownMenuCheckboxItem
									checked={countMeses === mes.id - 1}
									onCheckedChange={() => {
										updatePeriod(ano, mes.id - 1);
									}}
									key={mes.id}
								>
									{mes.name}
								</DropdownMenuCheckboxItem>
							);
						})}
				</DropdownMenuContent>
			</DropdownMenu>
			<ButtonGroupSeparator />
			<Button
				variant="secondary"
				size="icon"
				aria-label="Próximo mês"
				disabled={countMeses === meses.length - 1}
				onClick={() => {
					updatePeriod(ano, countMeses + 1);
				}}
			>
				<ChevronRight />
			</Button>
		</ButtonGroup>
	);
};

export default SelectAnoMeses;
