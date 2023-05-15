import React from 'react'
import "../css/review-card.css"
import Stars from './Stars'

export default function Body(props) {
  return (
    <div className='review-card'>
      <div className='personal-info'>
        <img src="/people.png" />
        <p>Anonymous</p>
      </div>
      <div className='personal-rate'>
        <Stars rate={props.review.rate} />
      </div>

      <div className='rate-comment'>
        {props.review.body}
      </div>
    </div>
  )
}