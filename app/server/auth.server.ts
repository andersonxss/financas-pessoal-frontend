import api from "@/api/server";
import type { IResetPassWord } from "@/interfaces";

export async function putResetPassWord(data: IResetPassWord): Promise<void> {
	await api.post("/auth/reset-password", data);
}
