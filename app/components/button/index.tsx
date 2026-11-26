import { Button } from "@/components/ui/button";

type Iprops = {
	type?: string;
	children: any;
	disabled?: boolean;
	onClick?: () => void;
	variante?: string;
};
const ButtonCustom = (props: Iprops) => {
	// Ensure type matches expected types for Button component and HTML spec
	// Fix: restrict type to "button" | "submit" | "reset" | undefined, and filter props accordingly
	const { type, children, onClick, disabled = false, ...rest } = props;

	return (
		<div className="w-full text-right mb-2">
			<Button
				type={type as "button" | "submit" | "reset" | undefined}
				disabled={disabled}
				onClick={onClick}
				{...rest}
			>
				{children}
			</Button>
		</div>
	);
};

export default ButtonCustom;
