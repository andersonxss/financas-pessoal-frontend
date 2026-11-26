import { useMemo } from "react";
import { Cards, ActionDataTable, ActionContainerButton, StatusCustom, DataTable, ActionEditButton, ButtonNovoRegistro, } from "@/components";
import type { IMembers } from "@/interfaces";


export default function MembrosTable({ members }: { members?: IMembers }) {
	const headerTable = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Pessoa",
			},
			{
				accessorKey: "role",
				header: "Papel",
			},
			{
				accessorKey: "active",
				header: "Situação",
				cell: ({ row }: any) => {
					const { active } = row.original;
					return <StatusCustom status={active ? "Ativo" : "Inativo"} />;
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
		<Cards>
			<ButtonNovoRegistro to="/admin/convites/create" text="Convidar Membro" />
			<DataTable columns={headerTable} data={members?.items || []} />
		</Cards>
	);
}

