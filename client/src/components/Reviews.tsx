import React from 'react'
import ReviewCard from './ReviewCard'

export default function Reviews() {
  const reviews = [<ReviewCard />, <ReviewCard />, <ReviewCard />, <ReviewCard />, <ReviewCard />, <ReviewCard />, <ReviewCard />];
  return (
    <div className='reviews'>
      {reviews}
    </div>
  )
}