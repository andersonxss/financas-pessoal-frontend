import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-[#C2E93A]",
				success:
					"bg-[#EAF7C0] text-[#40520A] hover:bg-[#DDF1A0] focus-visible:ring-[#8AA51F]/30",
				secondary: "bg-secondary text-secondary-foreground hover:bg-[#E2E9E9]",
				warning: "bg-[#FFF3CC] text-[#795A00] hover:bg-[#FFE9A3]",
				info: "bg-[#EAF3F6] text-[#31566A] hover:bg-[#DCECF1]",
				destructive: "bg-[#FFF0F3] text-[#A5223D] hover:bg-[#FFE1E7]",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
