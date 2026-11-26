import { memo } from "react";

const LabelForm = ({ label, htmlFor }: { label: string; htmlFor?: string }) => {
	if (!label) return null;
	return (
		<label
			htmlFor={htmlFor}
			className="text-sm font-bold leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			{label}
		</label>
	);
};

export default memo(LabelForm);
