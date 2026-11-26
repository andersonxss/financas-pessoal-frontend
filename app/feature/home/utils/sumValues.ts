import type { RegistroFinanceiro } from "@/interfaces";
import { toNumber } from "./toNumber";

export function sumValues(list: RegistroFinanceiro[]) {
	return list.reduce((total, item) => total + toNumber(item.valor), 0);
}
