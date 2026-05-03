import { Payment } from "./Payment";
import { useEffect } from "react";
import { useAppContext } from "../context";

const AccountDashboard = ({ setCurrentRoute }) => {
	const { customerSessionId } = useAppContext();

	useEffect(() => {
		if (window.cdApi) {
			window.cdApi.changeContext("AccountDashboard");
		}
		console.log(
			"AccountDashboard component rendered with session ID:",
			customerSessionId,
		);
	}, [customerSessionId]);
	return (
		<div>
			<h1>Account Dashboard</h1>
			<p>
				Welcome to your account dashboard! Here you can manage your
				account settings, view your activity, and more.
			</p>
			<button onClick={() => setCurrentRoute("/payment")}>Payment</button>
		</div>
	);
};

export { AccountDashboard as Dashboard };
