import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-[background-color,color,box-shadow,scale] duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.96] aria-invalid:border-destructive aria-invalid:ring-destructive/20",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-[0_10px_22px_-14px_rgba(104,128,15,0.75)] hover:bg-[#C2E93A]",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-[#B92947] focus-visible:ring-destructive/30",
				outline:
					"border border-border bg-white text-foreground hover:bg-secondary hover:text-secondary-foreground",
				secondary: "bg-secondary text-secondary-foreground hover:bg-[#E2E9E9]",
				ghost: "hover:bg-secondary hover:text-secondary-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-11 px-5 py-2.5 has-[>svg]:px-4",
				sm: "h-9 gap-1.5 px-3.5 has-[>svg]:px-3",
				lg: "h-12 px-6 has-[>svg]:px-5",
				icon: "size-11",
				"icon-sm": "size-11 md:size-10",
				"icon-lg": "size-12",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
