import { memo } from "react";

const DescricaoAlertValidate = ({
	fieldErrors,
}: {
	fieldErrors?: string | string[];
}) => {
	if (!fieldErrors) return null;
	const message = Array.isArray(fieldErrors)
		? fieldErrors.join(" ")
		: fieldErrors;
	return (
		<span
			role="alert"
			className="mt-1 block text-xs font-semibold text-destructive"
		>
			{message}
		</span>
	);
};

export default memo(DescricaoAlertValidate);
