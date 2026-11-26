import type React from "react";

const ActionContainerButton = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex w-full items-center justify-center gap-2 p-1">
			{children}
		</div>
	);
};

export default ActionContainerButton;
