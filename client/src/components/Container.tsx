import React from 'react'
import LoginForm from './LoginForm'

export default function container(){
    return(
        <div className='main-container'>
        <LoginForm />
        <img src="eshop.png" className='loginimg'/>
        </div>
    )
}