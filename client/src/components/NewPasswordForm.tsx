import React from 'react'
import Label from './Label';

export default function NewPASSWORD(){
    const [email_El,setEmail] = React.useState({
        pass: "",
        repass:"",
        checkpass:"",
        checkrepass:""
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
        let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if(!email_El.pass.match(decimal)){
            email_El.checkpass = "must be >= 8 characters with [a-z], [A-Z], [0-9], one symbol"
        }else email_El.checkpass = ""
        if(!(email_El.pass === email_El.repass) || !email_El.repass){
            email_El.checkrepass = "Not Match"
        }else email_El.checkrepass = ""
        if(email_El.pass.match(decimal) && (email_El.pass === email_El.repass)){
            //TODO
            // send data to backend
            email_El.checkpass = ""
            email_El.checkrepass = ""
        }
        handleChange(event)
    }
    return(
        <form className='Newpass-form'>
            <Label 
                for = 'pass-eee'
                label = 'Password'
                type = 'password'
                name = 'pass'
                id = 'pass-eee'
                value={email_El.pass}
                change = {handleChange}
                validation = {email_El.checkpass}
            />

            <Label 
                for = 'repass-ee'
                label = 'Repeat Password'
                type = 'password'
                name = 'repass'
                id = 'repass-ee'
                value={email_El.repass}
                change = {handleChange}
                validation = {email_El.checkrepass}
            />
            <button className='form--butt' onClick={handleSubmit}>Submit</button>
        </form>
    )
}