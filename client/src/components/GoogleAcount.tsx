import React from "react";
import API_URL from "../KEYS";

export default function GoogleAcount(props) {
	async function handleGoogle(event: React.MouseEvent<HTMLButtonElement>) {
		window.location.href = `${API_URL}/auth/google`;
	}

	return (
		<div className="google-container">
			<button className="google--butt" onClick={handleGoogle}>
				<img src="/images/gmail.png" className="google--img" />
				<p className="create">{props.name} with google</p>
			</button>
		</div>
	);
}
