import { useEffect, useRef, useState } from "react";
import { SquarePen, Plus, type LucideIcon } from "lucide-react";
interface Iforms {
	action: string;
	title: string;
	descriptionButton: string;
	validationErrors: string;
	method: string;
	defaultValues: any;
}

const useModalForms = (props?: any, defaultValues?: any, fetcher?: any) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const isSubmitting = useRef(false);

	// Derive form properties directly instead of syncing state with useEffect
	const isEdit = !!props;
	const formAction: Iforms = {
		action: isEdit ? `edit/${props.id}` : "create",
		title: isEdit ? "Editar" : "Adicionar",
		descriptionButton: isEdit ? "" : "Adicionar",
		validationErrors: fetcher?.data?.errors?.fieldErrors || "",
		method: isEdit ? "put" : "post",
		defaultValues: isEdit ? props : defaultValues || {},
	};

	useEffect(() => {
		// track transition from submitting -> idle
		if (fetcher?.state === "submitting" || fetcher?.state === "loading") {
			isSubmitting.current = true;
		} else if (fetcher?.state === "idle" && isSubmitting.current) {
			if (fetcher?.data?.success === true) {
				setIsOpen(false);
			}
			isSubmitting.current = false;
		}
	}, [fetcher?.state, fetcher?.data]);

	return {
		isOpen,
		setIsOpen,
		formAction,
	};
};
export default useModalForms;
