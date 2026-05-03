import { useState } from "react";
import "./App.css";
import { HomePage, Login, Dashboard, Payment } from "./Components";
import { AppProvider } from "./provider";

function App() {
	const [currentRoute, setCurrentRoute] = useState("/");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [customerSessionId, setCustomerSessionId] = useState(null);

	const renderRoute = () => {
		switch (currentRoute) {
			case "/login":
				return (
					<Login
						setIsLoggedIn={setIsLoggedIn}
						setCurrentRoute={setCurrentRoute}
					/>
				);
			case "/dashboard":
				return <Dashboard setCurrentRoute={setCurrentRoute} />;
			case "/payment":
				return <Payment />;
			case "/":
			default:
				return <HomePage />;
		}
	};

	const sendLogoutEvent = () => {
		const requestData = {
			action: "logout",
			customerSessionId: customerSessionId,
			uuid: crypto.randomUUID
				? crypto.randomUUID()
				: "uuid-" + Date.now(),
		};

		fetch("/api/webhook", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestData),
		})
			.then((response) => {
				if (response.ok) {
					console.log("[API] Logout event sent successfully:", {
						status: response.status,
						statusText: response.statusText,
					});
				} else {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
			})
			.catch((error) => {
				console.error("[API] Failed to send logout event:", error);
			});
	};

	const handleLogout = () => {
		sendLogoutEvent();
		setCustomerSessionId(null);
		setIsLoggedIn(false);
		setCurrentRoute("/");
	};
	return (
		<>
			<AppProvider
				customerSessionId={customerSessionId}
				setCustomerSessionId={setCustomerSessionId}>
				<nav style={{ marginBottom: "20px" }}>
					{!isLoggedIn ? (
						<>
							<button onClick={() => setCurrentRoute("/")}>
								Home
							</button>
							<button onClick={() => setCurrentRoute("/login")}>
								Login
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => setCurrentRoute("/dashboard")}>
								Dashboard
							</button>
							<button onClick={handleLogout}>Logout</button>
						</>
					)}
				</nav>

				{renderRoute()}
			</AppProvider>
		</>
	);
}

export default App;
