import { useMemo } from "react";
import { Cards, ActionDataTable, ActionContainerButton, StatusCustom, DataTable, ActionEditButton, ButtonNovoRegistro, } from "@/components";

interface IParcelas {
	parcelas: [];
}

export default function ({ parcelas }: IParcelas) {
	const headerTable = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Parcela",
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
							<ActionDataTable idPag={id} module="dos status." />
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
				<DataTable columns={headerTable} data={parcelas} />
			</Cards>
		</>
	);
}
