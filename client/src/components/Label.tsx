import React from 'react'

export default function Label(props) {
    return (
        <>
            <div className='form--ele'>
                <label htmlFor={props.for}>{props.label}</label>
                <div className='label--input'>
                    <input
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        onChange={props.change}
                        value={props.value}
                    />
                </div>

            </div>
            <p className='valid'>{props.validation}</p>
        </>
    )
}