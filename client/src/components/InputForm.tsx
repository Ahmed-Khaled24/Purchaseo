import React from "react";
import Label from "./Label";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { putUser, logoutUser } from "../store/features/userSlice";

export default function InputForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.user);
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
				url: "https://localhost:4000/auth/local",
				data: {
					email: email_El.email,
					password: email_El.pass,
					rememberMe: email_El.isChecked,
				},
			});
			if (loginRes.status === 200) {
				dispatch(putUser(loginRes.data.data));
				console.log(user);
				navigate("/");
				console.log(loginRes.data.data);
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
		// let valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		// let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
		// if (!email_El.email.match(valid)) {
		//     email_El.checkemail = "invalid Email"
		// } else email_El.checkemail = ""
		// if (!email_El.pass.match(decimal)) {
		//     email_El.checkpass = "must be >= 8 characters with [a-z], [A-Z], [0-9], one symbol"
		// } else email_El.checkpass = ""
		// if (email_El.email.match(valid) && email_El.pass.match(decimal)) {
		//     //TODO
		//     // send email_El.email , email_El.pass to backend
		//     email_El.checkemail = ""
		//     email_El.checkpass = ""
		// }
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
				type="pass"
				name="pass"
				id="pass-e"
				value={email_El.pass}
				change={handleChange}
				validation={email_El.checkpass}
			/>
			<div className="footer">
				<p id="footer-t">Forget Password ?</p>
				<NavLink to="/forget-password" id="foote--c">
					Reset Password
				</NavLink>
			</div>
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
				<p id="footer-t">Don't Have Account ?</p>
				<NavLink to="/sign-up" id="foote--c">
					Create One
				</NavLink>
			</div>
		</form>
	);
}
