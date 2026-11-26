import React from "react";
import rate from "../../assets/rate.svg";
import Cards from "../cards";
type Props = {
	title: string;
};

const PreviousItem = ({ title }: Props) => {
	return (
		<Cards>
			<span className="">{title}</span>
			<div className="container flex align-items-center justify-content-between h-3rem">
				<div className="value bg-green-500 p-2 border-round">R$ 100.00</div>
				<div className="images">
					{" "}
					<img src={rate} alt="tete" />
				</div>
			</div>
		</Cards>
	);
};

const Previous = () => {
	return (
		<div className="grid">
			<div className="md:col-4">
				<PreviousItem title="DEVENDO" />
			</div>
			<div className="md:col-4">
				{" "}
				<PreviousItem title="PAGO" />
			</div>
			<div className="md:col-4">
				<PreviousItem title="FUTURO" />
			</div>
		</div>
	);
};

export default Previous;
