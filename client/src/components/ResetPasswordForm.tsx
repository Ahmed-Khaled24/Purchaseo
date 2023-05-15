import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Label from "./Label";
import "../css/resetPassword.css";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = React.useState<string>("");
    const [email_El, setEmail] = React.useState({
        email: "",
        checkemail: "",
    });
    async function sendResetEmail() {
        try {
            const resetRes = await axios({
                method: "post",
                url: "https://localhost:4000/auth/forgot-password",
                data: {
                    email: email_El.email,
                },
            });
            if (resetRes.status === 200) {
                setSuccessMsg("Email sent successfully");
                console.log(resetRes.data);
            }
        } catch (error) {
            email_El.checkemail = `Error: ${error.response.data.data || "Something went wrong"}`;
        }
    }
    function handleChange(event) {
        setEmail((prevFormData) => {
            const { name, value } = event.target;
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }
    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const button = event.currentTarget
        setSuccessMsg("");
        let valid =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email_El.email.match(valid)) {
            email_El.checkemail = "invalid Email";
        } else email_El.checkemail = "";
        if (email_El.email.match(valid)) {
            // send email_El.email , email_El.pass to backend
            email_El.checkemail = "";
            await sendResetEmail();
            //TODO: doesnt show on screen
        }
        handleChange(event);
    }
    return (
        <form className="Newpass-form">
            <div id="success">{successMsg}</div>
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
            <button className="form--butt" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
}
