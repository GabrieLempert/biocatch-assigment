import { useEffect } from "react";
import { useAppContext } from "../context";

export const Login = ({ setIsLoggedIn, setCurrentRoute }) => {
	const { customerSessionId, setCustomerSessionId } = useAppContext();

	useEffect(() => {
		if (window.cdApi) {
			window.cdApi.changeContext("Login");
		}
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();

		const newSessionId =
			"session-id-" + Math.random().toString(36).substr(2, 9);

		setCustomerSessionId(newSessionId);

		try {
			const response = await fetch("/api/webhook", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					customerId: "dummy",
					action: "init",
					customerSessionId: newSessionId,
					activityType: "LOGIN",
					uuid: crypto.randomUUID
						? crypto.randomUUID()
						: "uuid-" + Date.now(),
					brand: "SD",
					solution: "ATO",
					iam: e.target.email.value,
				}),
			});

			// Check if the HTTP status is 200-299
			if (response.ok) {
				console.log({
					API: "Session initialized successfully",
					customerSessionId: newSessionId,
					status: response.status,
				});
			} else {
				console.error(
					"[API] Failed to initialize session:",
					response.statusText,
				);
			}
		} catch (error) {
			console.error("[API] Failed to init session:", error);
		}

		setIsLoggedIn(true);
		setCurrentRoute("/dashboard");
	};

	console.log("Login component rendered with session ID:", customerSessionId);

	return (
		<div>
			<h1>Login Page</h1>
			<form onSubmit={handleLogin}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
				/>
				<br />
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
				/>
				<br />
				<button type="submit">Login</button>
			</form>
		</div>
	);
};
