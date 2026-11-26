import { useMemo } from "react";
import {
	Cards,
	ActionDataTable,
	ActionContainerButton,
	DataTable,
	StatusCustom,
	ActionEditButton,
	ButtonNovoRegistro,
} from "@/components";

interface IPagamento {
	pagamentos: [];
}

// eslint-disable-next-line react/display-name
export default function ({ pagamentos }: IPagamento) {
	const headerTable = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Tipo de pagamento",
			},
			{
				accessorKey: "status.name",
				header: "Status",
				className: "text-center w-[2rem]",
				cell: ({ getValue }: any) => {
					const data = getValue("status");
					return <StatusCustom status={data} />;
				},
			},
			{
				header: "Ação",
				className: "text-center w-[2rem]",
				cell: ({ row }: any) => {
					const { id } = row.original;
					return (
						<ActionContainerButton>
							<ActionEditButton idPag={id} />
							<ActionDataTable idPag={id} module="dos tipos de pagamento." />
						</ActionContainerButton>
					);
				},
			},
		],
		[],
	);

	return (
		<>
			<ButtonNovoRegistro to="create" />
			<Cards>
				<DataTable columns={headerTable} data={pagamentos} />
			</Cards>
		</>
	);
}
