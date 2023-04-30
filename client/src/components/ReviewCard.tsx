import React from 'react'
import "../css/review-card.css"

export default function Body(props: any) {
  return (
    <div className='review-card'>
      <div className='personal-info'>
        <img src="people.png" />
        <p>Abdo Nasser</p>
      </div>
      <div className='personal-rate'>
        <p className='stars'>
          <img src="star-filled.png" />
          <img src="star-filled.png" />
          <img src="star-filled.png" />
          <img src="star-filled.png" />
          <img src="star.png" />
        </p>
        <p>4</p>
      </div>

      <div className='rate-comment'>
        Lorem ipsum dolor sit amet, minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
      </div>
    </div>
  )
}