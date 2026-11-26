const REFRESHABLE_AUTH_PATHS = new Set(["/auth/me", "/auth/logout"]);

export function canAttemptSessionRefresh(url: string | undefined): boolean {
	if (!url) return false;

	let pathname: string;
	try {
		pathname = new URL(url, "http://local").pathname;
	} catch {
		return false;
	}

	return !pathname.startsWith("/auth/") || REFRESHABLE_AUTH_PATHS.has(pathname);
}
