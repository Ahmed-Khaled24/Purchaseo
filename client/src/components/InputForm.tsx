import React from 'react'
import Label from './Label';

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
                <a href='' id='foote--c'>reset password</a>
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
                <p id='footer-t'>Do not have an account ?</p>
                <a href='' id='foote--c'>Create one</a>
            </div>

        </form>
    )
}
{/*         <div className='form--ele'>
            <label htmlFor='name-e'>Name</label>
            <input 
                type='text' 
                name='name'
                id='name-e'
                onChange={handleChange}
                value={email_El.name}
            />    
        </div> */}
{/*         <div className='form--ele'>
            <label htmlFor='email-e'>Email</label>
            <input 
                type='email' 
                name='email'
                placeholder='example@gmail.com'
                id='email-e'
                onChange={handleChange}
                value={email_El.email}
            />    
        </div> */}
{/*         <div className='form--ele'>
            <label htmlFor='pass-e'>Password</label>
            <input 
                type='password' 
                name='pass' 
                id='pass-e'
                onChange={handleChange}
                value={email_El.pass}
            />
        </div> */}
{/*         <div className='form--ele'>
            <label htmlFor='repass-e'>Re-Password</label>
            <input 
                type='password' 
                name='pass' 
                id='repass-e'
                onChange={handleChange}
                value={email_El.repass}
            />
        </div> */}