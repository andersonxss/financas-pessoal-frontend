import { CircleCheck } from "lucide-react";

const DescricaoCell = ({ row }: any) => {
	const { edit, active } = row.original;
	const data = row.getValue("descricao");

	if (!active) {
		return <span className="text-gray-500 line-through">{data}</span>;
	}

	return (
		<div className="flex items-center gap-2">
			<span className={edit ? "text-lime-400" : "text-white-400"}>{data}</span>
			{edit ? <CircleCheck className="text-lime-400" /> : ""}
		</div>
	);
};

export default DescricaoCell;
