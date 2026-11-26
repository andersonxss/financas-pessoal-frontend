import { redirect } from "react-router";
import api from "@/api/server";
import type { Route } from "./+types/logout";

export async function action(_: Route.ActionArgs) {
	try {
		await api.post("/auth/logout");
	} finally {
		return redirect("/login");
	}
}

export default function Logout() {
	return null;
}
