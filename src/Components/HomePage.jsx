import { useEffect } from "react";
import { useAppContext } from "../context";

export const HomePage = () => {
	const { customerSessionId } = useAppContext();
	useEffect(() => {
		if (window.cdApi) {
			window.cdApi.changeContext("HomePage");
		}
		console.log("CSID", customerSessionId);
	}, [customerSessionId]);

	return (
		<div>
			<h1>Home Page</h1>
		</div>
	);
};
