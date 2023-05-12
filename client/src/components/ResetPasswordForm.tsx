import React from 'react'
import Label from './Label';

export default function ResetPassword(){
    const [email_El,setEmail] = React.useState({
        email: "",
        checkemail:"",
    });

    function handleChange(event){
        setEmail(prevFormData => {
            const {name,value} = event.target
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    function handleSubmit(event){
        event.preventDefault()
        let valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!email_El.email.match(valid)){
            email_El.checkemail = "invalid Email"
        }else email_El.checkemail = ""
        if(email_El.email.match(valid)){
            //TODO
            // send email_El.email , email_El.pass to backend
            email_El.checkemail = ""
        }
        handleChange(event)
    }
    return(
        <form className='Newpass-form'>
            <Label 
                for = 'email-e'
                label = 'Email'
                type = 'email'
                name = 'email'
                id = 'email-e'
                value={email_El.email}
                change = {handleChange}
                validation = {email_El.checkemail}
            />
        <button className='form--butt' onClick={handleSubmit}>Submit</button>
        </form>
    )
}