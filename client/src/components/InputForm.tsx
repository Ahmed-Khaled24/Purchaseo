import React from "react";
import Label from "./Label";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../KEYS";
import { useDispatch, useSelector } from "react-redux";

export default function InputForm() {
	const navigate = useNavigate();
	const [email_El, setEmail] = React.useState({
		email: "",
		pass: "",
		isChecked: false,
		checkemail: "",
		checkpass: "",
	});
	async function Login() {
		try {
			const loginRes = await axios({
				method: "POST",
				withCredentials: true,
				url: `${API_URL}/auth/local`,
				data: {
					email: email_El.email,
					password: email_El.pass,
					rememberMe: email_El.isChecked,
				},
			});
			if (loginRes.status === 200) {
				window.location.href = "/";
			}
		} catch (error) {
			if (error.response.status === 401) {
				email_El.checkemail = "Invalid email or password";
			} else if (error.response.status === 409) {
				email_El.checkemail = "You are already logged in";
			} else {
				email_El.checkemail = "Something went wrong";
			}
		}
	}
	function handleChange(event) {
		setEmail((prevFormData) => {
			const { name, value, type, checked } = event.target;
			return {
				...prevFormData,
				[name]: type === "checkbox" ? checked : value,
			};
		});
	}
	async function handleSubmit(event) {
		event.preventDefault();
		await Login();
		handleChange(event);
	}

	return (
		<form className="form">
			<Label
				for="email-e"
				label="Email"
				type="email"
				name="email"
				id="email-e"
				value={email_El.email}
				change={handleChange}
				validation={email_El.checkemail}
			/>
			<Label
				for="pass-e"
				label="Password"
				type="password"
				name="pass"
				id="pass-e"
				value={email_El.pass}
				change={handleChange}
				validation={email_El.checkpass}
			/>
			<div className="footer">
				<NavLink to="/forget-password" id="foote--c">
					Forgot your password?
				</NavLink>
				<button className="form--butt" onClick={handleSubmit}>
					Login
				</button>
				<div className="checkk">
					<input
						type="checkbox"
						id="remember"
						checked={email_El.isChecked}
						onChange={handleChange}
						name="isChecked"
					/>
					<label htmlFor="remember">Remember Me</label>
				</div>
				<div className="footer">
					<p id="footer-t">
						Don't Have Account ?
						<NavLink to="/sign-up" id="foote--c">
							Create One
						</NavLink>
					</p>
				</div>
			</div>
		</form>
	);
}
