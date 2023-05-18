import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/add-review.css";
import {Review} from '../../../server/types/Review'
import { useParams } from "react-router-dom";
import API_URL from '../KEYS'



export default function AddReview() {
  const { productId } = useParams();
  const [review, setReview] = useState('');
  const [rate, setRate] = useState(0);

  function handleStarHover(index) {
    setRate(index + 1);
  }
  function handleStarLeave() {
    //setRate(0);
  }



  function handleReviewChange(event) {
    setReview(event.target.value); // update the review state with the current input value
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const reviewItem: Review = {
      product_id: productId,
      customer_id: 1,
      rate: rate,
      body: review

    }
    console.log({reviewItem})
    // await axios({
    //   method: 'post',
    //   url: `${API_URL}/review`,
    //   data :
    // })
  }

  return (
    <div className="add-review-form" >
      <div className="review-container">
        <div className="review-rate">
          <div className="review-rate-left">
            <div className="review-rate-text">Your Rate : </div>
            <div className="review-rate-stars">
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src={index < rate ? "/star-filled.png" : "/star.png"}
                    className="star"
                    onMouseEnter={() => handleStarHover(index)}
                    onMouseLeave={handleStarLeave}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <form action="" className="review-form" >
          <label htmlFor="review"> Write Your Review:</label>
          <textarea name="review" id="review" className="border-radius" onChange={handleReviewChange}></textarea>
          <button type="submit" className="submit-button border-radius" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div >
  )
}