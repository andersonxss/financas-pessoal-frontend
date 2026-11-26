import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

export default function useSidebarState() {
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const { pathname } = useLocation();
	useEffect(() => {
		setMobileOpen(false);
	}, [pathname]);
	useEffect(() => {
		const media = window.matchMedia(DESKTOP_MEDIA_QUERY);
		const closeOnDesktop = () => {
			if (media.matches) setMobileOpen(false);
		};
		media.addEventListener("change", closeOnDesktop);
		return () => media.removeEventListener("change", closeOnDesktop);
	}, []);
	const toggleCollapsed = () =>
		setCollapsed((previousCollapsed) => !previousCollapsed);
	const closeMobile = () => setMobileOpen(false);
	return { collapsed, mobileOpen, setMobileOpen, toggleCollapsed, closeMobile };
}
