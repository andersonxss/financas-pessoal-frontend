import api from "@/api/server";
import type {
	IConviteAceiteResponse,
	IConvites,
	IFormConvite,
	IFormConviteAceite,
} from "@/interfaces";

export async function postConvites(data: IFormConvite): Promise<undefined> {
	const response = await api.post("/invites", data);
	if (response) {
		return response.data;
	}
}

export async function postAceiteConvites(
	data: IFormConviteAceite,
): Promise<IConviteAceiteResponse> {
	const response = await api.post<IConviteAceiteResponse>(
		"/invites/accept",
		data,
	);
	return response.data;
}

export async function getConvites(): Promise<IConvites | undefined> {
	const response = await api.get("/invites?limit=100");
	if (response) {
		return response.data;
	}
}
