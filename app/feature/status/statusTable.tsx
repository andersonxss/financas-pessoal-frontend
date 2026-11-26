import { useMemo } from "react";
import {
	ActionDataTable,
	ActionContainerButton,
	DataTable,
	Cards,
	ActionEditButton,
	ButtonNovoRegistro,
} from "@/components";
import type { IStatus } from "@/interfaces/IStatus";


export default function ({ status }: { status: Array<IStatus> }) {
	const headerTable = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Status",
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

				<DataTable columns={headerTable} data={status} />
			</Cards>
		</>
	);
}
