import { CircleCheck, TriangleAlert } from "lucide-react";
import type React from "react";
import { Suspense, useEffect, useState } from "react";
import { useActionData } from "react-router";

type Props = {
	title?: string;
	children?: React.ReactNode;
};

const Page = ({ children, title }: Props) => {
	const actionData = useActionData<{
		formError?: string;
		formSuccess?: string;
	}>();
	const [stateAlert, setStateAlert] = useState(false);

	useEffect(() => {
		if (!actionData?.formError && !actionData?.formSuccess) return;

		setStateAlert(true);
		const timer = window.setTimeout(() => setStateAlert(false), 5000);
		return () => window.clearTimeout(timer);
	}, [actionData]);

	return (
		<Suspense
			fallback={
				<div className="mx-auto w-full max-w-[1500px] p-4 md:p-8">
					<div className="h-40 animate-pulse rounded-3xl bg-muted motion-reduce:animate-none" />
				</div>
			}
		>
			<div className="mx-auto w-full max-w-[1500px] min-w-0 p-4 md:p-7 lg:p-10">
				{stateAlert && (
					<div className="mb-6" aria-live="polite">
						{actionData?.formSuccess && (
							<div
								role="status"
								className="flex items-start gap-3 rounded-2xl bg-[#EFF9D2] p-4 text-sm text-[#31400A]"
							>
								<CircleCheck
									className="mt-0.5 size-5 shrink-0"
									aria-hidden="true"
								/>
								<p className="font-semibold">{actionData.formSuccess}</p>
							</div>
						)}
						{actionData?.formError && (
							<div
								role="alert"
								className="flex items-start gap-3 rounded-2xl bg-[#FFF0F3] p-4 text-sm text-[#8E1730]"
							>
								<TriangleAlert
									className="mt-0.5 size-5 shrink-0"
									aria-hidden="true"
								/>
								<div>
									<p className="font-semibold">Não foi possível salvar</p>
									<p className="mt-1 leading-6">{actionData.formError}</p>
								</div>
							</div>
						)}
					</div>
				)}
				{title && (
					<div className="mb-7 md:mb-9">
						<h1 className="text-2xl font-extrabold tracking-[-0.03em] text-foreground md:text-3xl">
							{title}
						</h1>
					</div>
				)}
				{children}
			</div>
		</Suspense>
	);
};

export default Page;
