import { CircleCheck, CircleDollarSign, Clock3 } from "lucide-react";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils";

const statusConfig = {
	1: {
		icon: CircleDollarSign,
		iconClass: "bg-[#FFF2F4] text-[#B62C48]",
	},
	2: {
		icon: CircleCheck,
		iconClass: "bg-[#EFF9D2] text-[#607608]",
	},
	3: {
		icon: Clock3,
		iconClass: "bg-[#EEF4F6] text-[#365C6C]",
	},
} as const;

export default function CardResultados({
	title,
	value,
	status,
}: {
	title: string;
	value: number;
	status: number;
}) {
	const config =
		statusConfig[status as keyof typeof statusConfig] ?? statusConfig[1];
	const Icon = config.icon;

	return (
		<Card className="@container/card w-full">
			<CardHeader>
				<CardDescription className="text-xs font-bold uppercase tracking-[0.1em]">
					{title}
				</CardDescription>
				<CardTitle className="text-2xl font-extrabold tracking-[-0.035em] tabular-nums @[250px]/card:text-3xl">
					{formatCurrency(value)}
				</CardTitle>
				<CardAction>
					<span
						className={cn(
							"flex size-10 items-center justify-center rounded-xl",
							config.iconClass,
						)}
					>
						<Icon className="size-5" aria-hidden="true" />
					</span>
				</CardAction>
			</CardHeader>
		</Card>
	);
}
