import { useNavigation } from "react-router";
import { Button } from "@/components/ui/button";

export const SubmitButton = () => {
	const navigation = useNavigation();
	const isSubmitting =
		navigation.state === "loading" || navigation.state === "submitting";

	return (
		<Button type="submit" disabled={isSubmitting}>
			{isSubmitting ? "Salvando..." : "Salvar"}
		</Button>
	);
};
