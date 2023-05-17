import React from "react";
import GoogleAcount from "./GoogleAcount";
import CreateInputForm from "./CreateInputForm";

export default function CreateForm() {
	return (
		<div className="create-container">
			<h1 className="login--header">Create account</h1>
			<GoogleAcount name="Create" />
			<CreateInputForm />
		</div>
	);
}
