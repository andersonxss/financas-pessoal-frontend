import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
	children?: React.ReactNode;
	title?: string;
	description?: string;
	action?: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
};

const Cards = ({
	children,
	title,
	description,
	action,
	footer,
	className,
}: Props) => {
	return (
		<Card className={cn("min-w-0", className)}>
			{(title || description || action) && (
				<CardHeader>
					{title && <CardTitle>{title}</CardTitle>}
					{description && <CardDescription>{description}</CardDescription>}
					{action && <CardAction>{action}</CardAction>}
				</CardHeader>
			)}
			<CardContent>{children}</CardContent>

			{footer && (
				<CardFooter>
					<CardAction>{footer}</CardAction>
				</CardFooter>
			)}
		</Card>
	);
};

export default Cards;
