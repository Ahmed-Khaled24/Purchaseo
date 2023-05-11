import React, { useEffect, useState } from "react";
import "../css/add-review.css";


export default function AddReview() {
  const [review, setReview] = useState('');
  const [rate, setRate] = useState(0);

  function handleStarHover(index) {
    setRate(index + 1);
  }

  function handleStarLeave() {
    setRate(0);
  }



  function handleReviewChange(event) {
    setReview(event.target.value); // update the review state with the current input value
  }

  return (
    <div className="add-review-form" >
      <h1>Add Review</h1>
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
          <div className="review-rate-right">
            <img src="/items/item1.png" className="product-review-image" alt="" />
          </div>
        </div>
        <form action="" className="review-form" >
          <label htmlFor="review"> Write Your Review:</label>
          <textarea name="review" id="review" className="border-radius" onChange={handleReviewChange}></textarea>
          <button type="submit" className="submit-button border-radius">Submit</button>
        </form>
      </div>
    </div >
  )
}