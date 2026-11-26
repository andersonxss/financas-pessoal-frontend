import type { RegistroFinanceiro } from "@/interfaces";
import { toNumber } from "./toNumber";

export function sumByStatus(list: RegistroFinanceiro[], statusId: string) {
	return list
		.filter((item) => item.status_id === statusId)
		.reduce((total, item) => total + toNumber(item.valor), 0);
}
