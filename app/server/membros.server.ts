import api from "@/api/server";
import type { IMembers } from "@/interfaces";


export async function getMembros(): Promise<IMembers | undefined> {
    const response = await api.get("/members?limit=100");
    if (response) {
        return response.data;
    }

}