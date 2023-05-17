import "../css/order-redirect.css";
import NavBar from "./NavBarNormal";
import { useParams } from "react-router-dom";

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
	const {status} = useParams();
	return (
		<div className={"order-redirect-wrapper"}>
			{status === "success" ? <SuccessRedirect /> : <FailureRedirect />}
		</div>
	);
}
