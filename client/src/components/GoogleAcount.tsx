import React from 'react'

export default function GoogleAcount(props){

    return(
        <div className='google-container'>
            <button className='google--butt'>
                <img src = "/images/gmail.png" className='google--img'/>
                <p className='create'>{props.name} with google</p>
            </button>
        </div>
    )
}