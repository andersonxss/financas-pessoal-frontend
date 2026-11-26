import type React from "react";

interface IProps {
	children?: React.ReactNode;
}

const ContainerButton = ({ children }: IProps) => {
	return (
		<div className="mt-7 flex w-full flex-wrap justify-end gap-3 border-t border-border/70 pt-5">
			{children}
		</div>
	);
};

export default ContainerButton;
