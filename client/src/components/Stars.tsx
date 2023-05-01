import React from "react";
import "../css/stars.css";

function fill(num: any) {
  const stars = [];
  for (let i = 0; i < num; i++)
    stars.push("star-filled.png")
  for (let i = num; i < 5; i++)
    stars.push("star.png")
  return stars;
}

export default function Stars(props: any) {
  let rate = [];
  rate = fill(Math.round(props.rate));
  rate = rate.map(item => (<img src={item} />));

  return (
    <div className="stars">
      <p className="stars">{rate}</p>
      <p className="count">{Math.round(props.rate)}</p>
    </div>
  )
}