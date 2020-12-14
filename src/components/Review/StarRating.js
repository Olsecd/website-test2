import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const ratingHandler = (e) => {
    setRating(e);
    console.log(e);
  };
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              type='radio'
              name='rating'
              id='radio-input'
              value={ratingValue}
              onClick={() => ratingHandler(ratingValue)}
            />
            <FaStar
              className='star'
              color={ratingValue <= (hover || rating) ? "#face48" : "#e4e5e9"}
              size={50}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
