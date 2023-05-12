import React from 'react'
import NewPASSWORD from './NewPasswordForm'

export default function NewPasswordContainer(){
    return(
        <div className='Newpass'>
            <h1 className='login--header'>New Password</h1>
            <NewPASSWORD />
        </div>
    )
}