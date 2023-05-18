import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import Label from './Label';
import '../css/resetPassword.css'
import API_URL from '../KEYS';
export default function NewPASSWORD(){
    const {token} = useParams<{token:string}>();
    const [successMsg,setSuccessMsg] = React.useState<string>("")
    const [email_El,setEmail] = React.useState({
        pass: "",
        repass:"",
        checkpass:"",
        checkrepass:""
    });

    async function ResetPassword(){
        try{
            const resetRes= await axios({
                method: "POST",
                url: `${API_URL}/auth/reset-password`,
                data: {
                    token: token,
                    password: email_El.pass,
                }
            })
            if(resetRes.status === 200){
                // TODO: show success message
                setSuccessMsg("Password changed successfully")
                console.log(resetRes.data)
            }
        } catch(error){
            console.log(error.response.data)
            email_El.checkpass = `Error: ${error.response.data.data || "Something went wrong"}`
        }
    }

    function handleChange(event){
        setEmail(prevFormData => {
            const {name,value} = event.target
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    async function handleSubmit(event){
        event.preventDefault()
        setSuccessMsg("")
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
            await ResetPassword();
        }
        handleChange(event)
    }
    return(
        <form className='Newpass-form'>
            <div id="success">{successMsg}</div>
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