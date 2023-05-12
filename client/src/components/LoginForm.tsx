import React from 'react'
import GoogleAcount from './GoogleAcount'
import InputForm from './InputForm'
import '../css/google.css'
import '../css/form.css'
import '../css/login-container.css'

export default function LoginForm(){
    return(
        <div className='login-container'>
            <h1 className='login--header'>Login</h1>
            <GoogleAcount 
                name ='Login'
            />
            <InputForm />
        </div>
    )
}