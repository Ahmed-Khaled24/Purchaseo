import { useEffect, useState } from "react";
import "../css/order-redirect.css";
import NavBar from "./NavBarNormal";
import { useNavigate, useParams } from "react-router-dom";

function SuccessRedirect() {
	return (
		<div className={"success-order-redirect-wrapper"}>
			<h1>Order Placed Successfully!</h1>
			<p>Thank you for shopping with us!</p>
		</div>
	);
}

function FailureRedirect() {
	return (
		<div className={"failure-order-redirect-wrapper"}>
			<div className={"failure-redirect"}>
				<h1>Order Failed!</h1>
				<p>Sorry, your order could not be placed.</p>
			</div>
		</div>
	);
}

export default function OrderRedirect() {
	const navigate = useNavigate();
	const { status } = useParams();
	const [redirectTimer, setRedirectTimer] = useState(10);
	useEffect(() => {
		if (redirectTimer === 0) {
			navigate("/");
		}
		setTimeout(() => {
			setRedirectTimer(redirectTimer - 1);
		}, 1000);
	}, [redirectTimer]);
	return (
		<div className={"order-redirect-wrapper"}>
			{status === "success" ? <SuccessRedirect /> : <FailureRedirect />}
			<p className={"redirect-timer"}>Redirecting to home page in {redirectTimer} seconds...</p>
		</div>
	);
}
