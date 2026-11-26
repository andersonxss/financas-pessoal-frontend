import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";

const StatusCustom = ({ status }: { status: string }) => {
	const responseTag = useMemo(() => {
		const bag: any = {
			Pago: "success",
			Inativo: "destructive",
			Ativo: "success",
			Aberto: "info",

		};
		return <Badge variant={bag[status] || "secondary"}>{status}</Badge>;
	}, [status]);
	return <>{responseTag}</>;
};

export default StatusCustom;
