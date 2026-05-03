import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
	],
	server: {
		proxy: {
			"/api/webhook": {
				target: "https://webhook.site",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(
						/^\/api\/webhook/,
						"/0c5ca33e-8a30-4247-95c6-e5f33fe4884a",
					),
			},
		},
	},
});
