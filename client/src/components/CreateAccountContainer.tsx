import React from 'react'
import CreateForm from './CreatForm'

export default function CreateAccountContainer(){
    return(
        <div className='login-signup-parent-container'>
        <div className='main-container'>
        <CreateForm />
        <img src="eshop.png" className='loginimg'/>
        </div>
        </div>
    )
}