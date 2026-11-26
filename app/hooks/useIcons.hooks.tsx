import React, { useMemo } from "react";
import {
	BookOpenIcon,
	InfoIcon,
	LifeBuoyIcon,
	HomeIcon,
	BanknoteArrowDown,
	BadgeDollarSign,
	CheckCircle,
	CircleDollarSign,
	CreditCard,
	DollarSign,
	TrendingDown,
	Wallet,
	TrashIcon,
} from "lucide-react";

const propsIcons: { size: number; className: string; ariaHidden: any } = {
	size: 16,
	className: "text-foreground opacity-60",
	ariaHidden: "true",
};

const useIconsHooks = () => {
	const iconMenu: { [key: string]: React.ReactNode } = useMemo(
		() => ({
			HomeIcon: (
				<HomeIcon
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			BookOpenIcon: (
				<BookOpenIcon
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			LifeBuoyIcon: (
				<LifeBuoyIcon
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			InfoIcon: (
				<InfoIcon
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			BanknoteArrowDown: (
				<BanknoteArrowDown
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			BadgeDollarSign: (
				<BadgeDollarSign
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			CheckCircle: (
				<CheckCircle
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			CircleDollarSign: (
				<CircleDollarSign
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			CreditCard: (
				<CreditCard
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			DollarSign: (
				<DollarSign
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			TrendingDown: (
				<TrendingDown
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			Wallet: (
				<Wallet
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
			TrashIcon: (
				<TrashIcon
					size={propsIcons.size}
					className={propsIcons.className}
					aria-hidden={propsIcons.ariaHidden}
				/>
			),
		}),
		[],
	);

	return { iconMenu };
};

export default useIconsHooks;
