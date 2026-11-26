import { Progress } from "@/components/ui/progress";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

const ProgressData = ({
	loading,
	progress,
}: {
	loading: boolean;
	progress: number;
}) => {
	if (!loading) return null;
	return (
		<div className="mb-4">
			<Item variant="outline">
				<ItemMedia variant="icon">
					<Spinner />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Processando dados...</ItemTitle>
					<ItemDescription>{progress} / 100%</ItemDescription>
				</ItemContent>
				<ItemFooter>
					<Progress value={progress} />
				</ItemFooter>
			</Item>
		</div>
	);
};

export default ProgressData;
