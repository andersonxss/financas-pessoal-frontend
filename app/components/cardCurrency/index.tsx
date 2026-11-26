import { formatCurrency } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIconsHooks } from "@/hooks";

type Props = {
	descricao?: string;
	valor?: number;
	icon?: string;
	detalhes?: string;
};

const CardCurrency = ({ descricao, valor = 0, icon = "", detalhes }: Props) => {
	const { iconMenu } = useIconsHooks();
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{descricao}</CardTitle>
				{iconMenu[icon || ""]}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{formatCurrency(valor)}</div>
				{detalhes && (
					<p className="text-xs text-muted-foreground">{detalhes}</p>
				)}
			</CardContent>
		</Card>
	);
};

export default CardCurrency;
