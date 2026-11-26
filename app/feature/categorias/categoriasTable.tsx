import { useMemo } from "react";
import {
	Cards,
	ActionDataTable,
	ActionContainerButton,
	StatusCustom,
	DataTable,
	ActionEditButton,
	ButtonNovoRegistro,
} from "@/components";

interface ICategorias {
	categorias: [];
}

// eslint-disable-next-line react/display-name
export default function ({ categorias }: ICategorias) {
	const headerTable = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Nome",
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
							<ActionDataTable idPag={id} module="das categorias." />
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
				<DataTable columns={headerTable} data={categorias} />
			</Cards>
		</>
	);
}
