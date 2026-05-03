//create a context to share the controller instance across components
import { createContext, useContext } from "react";

export const AppContext = createContext({
	customerSessionId: null,
});

// A custom hook to easily consume the context in any component
export const useAppContext = () => useContext(AppContext);
