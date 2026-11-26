import { ChevronRight, Landmark, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const matchesRoute = (pathname: string, href: string) =>
	pathname === `/${href}` || pathname.startsWith(`/${href}/`);

interface SidebarNavigationGroupProps {
	group: { label: string; items: readonly { href: string; label: string }[] };
	collapsed: boolean;
	onNavigate?: () => void;
}

export default function SidebarNavigationGroup({
	group,
	collapsed,
	onNavigate,
}: SidebarNavigationGroupProps) {
	const { pathname } = useLocation();
	const active = group.items.some((item) => matchesRoute(pathname, item.href));
	const [open, setOpen] = useState(true);
	const Icon = group.label === "Financeiro" ? Landmark : Settings2;

	useEffect(() => {
		if (active) setOpen(true);
	}, [active]);

	const buttonClass = cn(
		"flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring",
		active && "font-bold text-sidebar-accent-foreground",
		collapsed && "justify-center px-0",
	);
	const links = group.items.map((item) => (
		<NavLink
			key={item.href}
			to={`/${item.href}`}
			onClick={onNavigate}
			className={({ isActive }) =>
				cn(
					"flex min-h-10 items-center rounded-xl px-3 text-sm outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring",
					isActive
						? "bg-sidebar-primary text-sidebar-primary-foreground font-bold"
						: "text-muted-foreground",
				)
			}
		>
			{item.label}
		</NavLink>
	));

	if (collapsed) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						className={buttonClass}
						aria-label={group.label}
						title={group.label}
					>
						<Icon className="size-4 shrink-0" aria-hidden="true" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="right" align="start" className="min-w-48">
					<DropdownMenuLabel>{group.label}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{group.items.map((item) => (
						<DropdownMenuItem key={item.href} asChild>
							<NavLink
								to={`/${item.href}`}
								onClick={onNavigate}
								className={
									matchesRoute(pathname, item.href)
										? "bg-accent font-semibold"
										: undefined
								}
							>
								{item.label}
							</NavLink>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<div>
			<button
				type="button"
				className={buttonClass}
				aria-expanded={open}
				onClick={() => setOpen((previousOpen) => !previousOpen)}
			>
				<Icon className="size-4 shrink-0" aria-hidden="true" />
				<span className="flex-1 text-left">{group.label}</span>
				<ChevronRight
					className={cn(
						"size-4 transition-transform motion-reduce:transition-none",
						open && "rotate-90",
					)}
					aria-hidden="true"
				/>
			</button>
			{open && (
				<div className="my-1 ml-5 grid gap-1 border-l border-sidebar-border pl-3">
					{links}
				</div>
			)}
		</div>
	);
}
