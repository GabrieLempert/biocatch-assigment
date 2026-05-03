import { useEffect } from "react";
import { useAppContext } from "../context";

const PaymentPage = () => {
	const { customerSessionId } = useAppContext();

	useEffect(() => {
		if (window.cdApi) {
			window.cdApi.changeContext("Payment");
		}
	}, []);

	const encryptCardNumber = (cardNumber) => {
		return btoa(cardNumber);
	};

	const handlePayment = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/webhook", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "getScore",
					customerSessionId: customerSessionId,
					cardNumber: encryptCardNumber(e.target.cardNumber.value),
					activityType: "PAYMENT",
					uuid: crypto.randomUUID
						? crypto.randomUUID()
						: "uuid-" + Date.now(),
				}),
			});

			if (response.ok) {
				console.log("[API] Score response received:", {
					status: response.status,
					statusText: response.statusText,
				});
			} else {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
		} catch (error) {
			console.error("[API] Failed to get score:", error);
		}
	};

	return (
		<div>
			<form
				onSubmit={handlePayment}
				style={{
					display: "flex",
					flexDirection: "column",
					width: "300px",
				}}>
				<h1>Payment Page</h1>
				<label htmlFor="cardNumber">Card Number:</label>
				<input
					type="text"
					id="cardNumber"
					name="cardNumber"
				/>

				<button
					type="submit"
					style={{ marginTop: "20px" }}>
					Submit Payment
				</button>
			</form>
		</div>
	);
};

export { PaymentPage as Payment };
