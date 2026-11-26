"use client";
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { CircleDollarSign } from "lucide-react";
import { type CSSProperties, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	manualPagination?: boolean;
}

type StyledColumnDef<TData> = ColumnDef<TData, unknown> & {
	className?: string;
	style?: CSSProperties;
};

function DataTable<TData, TValue>({
	columns,
	data,
	manualPagination = false,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const table = useReactTable({
		data,
		columns,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: manualPagination,
		state: {
			columnFilters,
		},
	});

	return (
		<>
			<div className="overflow-hidden rounded-[20px] border border-border/80 bg-white">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const columnDef = header.column
										.columnDef as StyledColumnDef<TData>;
									return (
										<TableHead
											className={cn(columnDef.className, "whitespace-nowrap")}
											style={columnDef.style}
											key={header.id}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => {
										const columnDef = cell.column
											.columnDef as StyledColumnDef<TData>;
										return (
											<TableCell
												key={cell.id}
												className={cn(
													columnDef.className,
													"font-medium text-foreground",
												)}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										);
									})}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-40 text-center"
								>
									<div className="flex flex-col items-center justify-center gap-3 py-8 text-muted-foreground">
										<span className="flex size-11 items-center justify-center rounded-xl bg-muted">
											<CircleDollarSign className="size-5" aria-hidden="true" />
										</span>
										<div>
											<p className="font-bold text-foreground">
												Nenhum registro encontrado
											</p>
											<p className="mt-1 text-sm">
												Os lançamentos aparecerão aqui.
											</p>
										</div>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{!manualPagination && (
				<div className="flex flex-wrap items-center justify-between gap-3 pt-5">
					<p className="text-xs font-semibold text-muted-foreground">
						Página {table.getState().pagination.pageIndex + 1} de{" "}
						{Math.max(1, table.getPageCount())}
					</p>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Voltar
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Avançar
						</Button>
					</div>
				</div>
			)}
		</>
	);
}

export default DataTable;
