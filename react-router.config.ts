import type { Config } from "@react-router/dev/config";

export default {
	// Config options...
	// Server-side render by default, to enable SPA mode set this to `false`
	ssr: true,
	future: {
		v8_middleware: true,
	},
	// Use file-based routing (convention over configuration)
	// This will automatically detect routes from app/routes folder
} satisfies Config;
