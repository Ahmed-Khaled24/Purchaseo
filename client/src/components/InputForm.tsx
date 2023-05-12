import React from 'react'
import Label from './Label';
import { NavLink } from 'react-router-dom';

export default function InputForm() {
    const [email_El, setEmail] = React.useState({
        email: "",
        pass: "",
        isChecked: false,
        checkemail: "",
        checkpass: ""
    });

    function handleChange(event) {
        setEmail(prevFormData => {
            const { name, value, type, checked } = event.target
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        let valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!email_El.email.match(valid)) {
            email_El.checkemail = "invalid Email"
        } else email_El.checkemail = ""
        if (!email_El.pass.match(decimal)) {
            email_El.checkpass = "must be >= 8 characters with [a-z], [A-Z], [0-9], one symbol"
        } else email_El.checkpass = ""
        if (email_El.email.match(valid) && email_El.pass.match(decimal)) {
            //TODO
            // send email_El.email , email_El.pass to backend
            email_El.checkemail = ""
            email_El.checkpass = ""
        }
        handleChange(event)
    }
    return (
        <form className='form'>
            <Label
                for='email-e'
                label='Email'
                type='email'
                name='email'
                id='email-e'
                value={email_El.email}
                change={handleChange}
                validation={email_El.checkemail}
            />
            <Label
                for='pass-e'
                label='Password'
                type='pass'
                name='pass'
                id='pass-e'
                value={email_El.pass}
                change={handleChange}
                validation={email_El.checkpass}
            />
            <div className='footer'>
                <p id='footer-t'>Forget Password ?</p>
                <a href='' id='foote--c'>Reset Password</a>
            </div>
            <button className='form--butt' onClick={handleSubmit}>Login</button>
            <div className='checkk'>
                <input
                    type='checkbox'
                    id='remember'
                    checked={email_El.isChecked}
                    onChange={handleChange}
                    name='isChecked'
                />
                <label htmlFor='remember'>Remember Me</label>
            </div>
            <div className='footer'>
                <p id='footer-t'>Don't Have Account ?</p>
                <NavLink to='/Sign-up' id='foote--c'>Create One</NavLink>
            </div>

        </form>
    )
}