import { AppContext } from "./context";

export const AppProvider = ({
	children,
	customerSessionId,
	setCustomerSessionId,
}) => {
	const handleSetCustomerSessionId = (newSessionId) => {
		setCustomerSessionId(newSessionId);
		if (window.cdApi) {
			window.cdApi.setCustomerSessionId(newSessionId || "");
		}
	};
	return (
		<AppContext.Provider
			value={{
				customerSessionId,
				setCustomerSessionId: handleSetCustomerSessionId,
			}}>
			{children}
		</AppContext.Provider>
	);
};
