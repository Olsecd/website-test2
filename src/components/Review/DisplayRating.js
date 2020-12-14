import React from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

const DisplayRating = (props) => {
  return (
    <div>
      {/* Make an array the size of the rating using parseInt. Map it, return the amount of stars. */}
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <FaStar
            size={15}
            className='star'
            color={ratingValue <= props.rating ? "#face48" : "#e4e5e9"}
          />
        );
      })}
    </div>
  );
};

export default DisplayRating;
