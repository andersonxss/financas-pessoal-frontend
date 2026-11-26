import axios from "axios";
import { canAttemptSessionRefresh } from "./refresh-policy";

let refreshPromise: Promise<void> | null = null;

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3333",
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const original = error.config as
			| (typeof error.config & { _retry?: boolean })
			| undefined;
		if (
			error.response?.status !== 401 ||
			!original ||
			original._retry ||
			!canAttemptSessionRefresh(original.url)
		) {
			return Promise.reject(error);
		}
		original._retry = true;
		refreshPromise ??= axios
			.post(`${api.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true })
			.then(() => undefined)
			.finally(() => {
				refreshPromise = null;
			});
		await refreshPromise;
		return api(original);
	},
);

export default api;
