import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../KEYS'
export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const params = useParams();


  useEffect(() => {
    (async () => {
      console.log(params.id);
      let prodReviews = await axios.get(`${API_URL}/review/product/${params.id}`)
      setReviews(prodReviews?.data?.data);
    })();
  }, [])


  return (
    <div className='reviews'>
      {reviews.map((review) => <ReviewCard review={review} />)}
    </div>
  )
}