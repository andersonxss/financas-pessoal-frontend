import { Cards } from "@/components";

type IProps = {
	title: string;
	valor: number;
	type: string;
};
const PreviousItens = ({ title, valor, type }: IProps) => {
	// style="margin-right: 12px; background-color: rgb(11, 209, 138); box-shadow: rgba(11, 209, 138, 0.3) 0px 6px 20px;"
	return (
		<Cards>
			<span className="text-sm font-medium line-height-1"> {title}</span>
			<div className="flex justify-content-between">
				<div className="flex justify-content-between align-items-center">
					<div className="flex justify-content-center align-items-center h-2rem w-5rem border-round p-2 mr-3">
						<i className="pi pi-arrow-up w-2rem"></i>
					</div>
					<div className="line-height-4 text-4xl">{valor}</div>
				</div>
			</div>
		</Cards>
	);
};

export default PreviousItens;
