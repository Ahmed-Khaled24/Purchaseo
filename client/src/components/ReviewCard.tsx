import React from 'react'
import "../css/review-card.css"
import Stars from './Stars'

export default function Body(props) {
  return (
    <div className='review-card'>
      <div className='personal-info'>
        <img src="/people.png" />
        <p>Abdo Nasser</p>
      </div>
      <div className='personal-rate'>
        <Stars rate={4} />
      </div>

      <div className='rate-comment'>
        Lorem ipsum dolor sit amet, minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
      </div>
    </div>
  )
}