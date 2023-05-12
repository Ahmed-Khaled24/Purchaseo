import React from 'react'
import Label from './Label';

export default function CreateInputForm(){
    const [email_El,setEmail] = React.useState({
        name:"",
        email: "",
        pass: "",
        repass:"",
        isChecked: false,
        checkname:"",
        checkemail:"",
        checkpass:"",
        checkrepass:""
    });

    function handleChange(event){
        setEmail(prevFormData => {
            const {name,value,type,checked} = event.target
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    function handleSubmit(event){
        event.preventDefault()
        let valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if(!email_El.name){
            email_El.checkname = "Missing"
        }else email_El.checkname = ""
        if(!email_El.email.match(valid)){
            email_El.checkemail = "invalid Email"
        }else email_El.checkemail = ""
        if(!email_El.pass.match(decimal)){
            email_El.checkpass = "must be >= 8 characters with [a-z], [A-Z], [0-9], one symbol"
        }else email_El.checkpass = ""
        if(!(email_El.pass === email_El.repass) || !email_El.repass){
            email_El.checkrepass = "Not Match"
        }else email_El.checkrepass = ""
        if(email_El.email.match(valid) && email_El.pass.match(decimal) && (email_El.pass === email_El.repass)){
            //TODO
            // send data to backend
            email_El.checkname = ""
            email_El.checkpass = ""
            email_El.checkemail = ""
            email_El.checkrepass = ""
        }
        handleChange(event)
    }
    return(
        
        <form className='create-form'>
            <Label 
                for = 'name-ee'
                label = 'Name'
                type = 'text'
                name = 'name'
                id = 'name-ee'
                value={email_El.name}
                change = {handleChange}
                validation = {email_El.checkname}
            />
            <Label 
                for = 'email-ee'
                label = 'Email'
                type = 'email'
                name = 'email'
                id = 'email-ee'
                value={email_El.email}
                change = {handleChange}
                validation = {email_El.checkemail}
            />
            <Label 
                for = 'pass-ee'
                label = 'Password'
                type = 'password'
                name = 'pass'
                id = 'pass-ee'
                value={email_El.pass}
                change = {handleChange}
                validation = {email_El.checkpass}
            />

            <Label 
                for = 'repass-e'
                label = 'Repeat Password'
                type = 'password'
                name = 'repass'
                id = 'repass-e'
                value={email_El.repass}
                change = {handleChange}
                validation = {email_El.checkrepass}
            />

        <button className='form--butt' onClick={handleSubmit}>Create Account</button>
        <div className='checkk'>
            <input 
                type='checkbox'
                id = 'check'
                checked = {email_El.isChecked}
                onChange={handleChange}
                name = 'isChecked'
            />
            <label htmlFor='check'  >iam a seller</label>
        </div>
        <div className='footer'>
            <p id = 'footer-t'>Already a member ?</p>
            <a href='' id='foote--c'>Login</a>
        </div>
        </form>
    )
}
/*             <div className='form--ele'>
                <label htmlFor='pass-ee'>password</label>
                <div className='label--pass'>
                    <input 
                        type='password'
                        name='pass'
                        id='pass-ee'
                        onChange={handleChange}
                        value={email_El.pass}
                    />
                    <p className='valid'>{email_El.checkpass}</p>
                </div>
            </div> */