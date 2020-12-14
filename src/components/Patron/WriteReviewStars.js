import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

import { Form, FormGroup, Button, Input } from "reactstrap";
import "./WriteReview.css";

const WriteReviewStars = () => {
  let insertReviewUrl = "/react-backend/patron/insertReviewFile.php";

  const [hover, setHover] = useState(null);

  const [comment, setComment] = useState(null);

  const [distRating, setDistRating] = useState(null);
  const [saniRating, setSaniRating] = useState(null);
  const [maskRating, setMaskRating] = useState(null);
  const [comments, setComments] = useState(null);

  const [distRatingDisplay, setDistRatingDisplay] = useState(null);
  const [saniRatingDisplay, setSaniRatingDisplay] = useState(null);
  const [maskRatingDisplay, setMaskRatingDisplay] = useState(null);

  const onChange = (e) => {
    setComment({ [e.target.name]: e.target.value });
    console.log(comment);
  };

  const submitReviewHandler = () => {
    let review = new FormData();
    review.append("mask_rating", maskRating);
    review.append("sanitize_rating", saniRating);
    review.append("social_distance_rating", distRating);
    review.append("comment", comments);

    axios.post(insertReviewUrl, review).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <Form>
        <div>
          <label>Social Distance Rating</label>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label key='dist'>
                <input
                  type='radio'
                  name='social_distance_rating'
                  id='radio-input'
                  value={distRating}
                  onClick={() => {
                    setDistRating(ratingValue);
                    console.log("Distance Rating: " + ratingValue);
                  }}
                />
                <FaStar
                  className='star'
                  color={
                    ratingValue <= (hover || distRating) ? "#face48" : "#e4e5e9"
                  }
                  size={50}
                  onMouseEnter={() => setDistRatingDisplay(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>

        <div>
          <label>Sanitizer Rating</label>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label key='san'>
                {" "}
                <input
                  type='radio'
                  name='sanitize_rating'
                  id='radio-input'
                  value={saniRating}
                  onClick={() => {
                    setSaniRating(ratingValue);
                    console.log("Sanitizer Rating: " + ratingValue);
                  }}
                />
                <FaStar
                  className='star'
                  color={
                    ratingValue <= (hover || saniRating) ? "#face48" : "#e4e5e9"
                  }
                  size={50}
                  onMouseEnter={() => setSaniRatingDisplay(ratingValue)}
                  onMouseLeave={() => setSaniRatingDisplay(null)}
                />
              </label>
            );
          })}
        </div>

        <div>
          <label>Mask Rating</label>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label key='mask'>
                {" "}
                <input
                  type='radio'
                  name='mask_rating'
                  id='radio-input'
                  value={maskRating}
                  onClick={() => {
                    setMaskRating(ratingValue);
                    console.log("Mask Rating: " + ratingValue);
                  }}
                />
                <FaStar
                  className='star'
                  color={
                    ratingValue <= (hover || maskRating) ? "#face48" : "#e4e5e9"
                  }
                  size={50}
                  onMouseEnter={() => setMaskRatingDisplay(ratingValue)}
                  onMouseLeave={() => setMaskRatingDisplay(null)}
                />
              </label>
            );
          })}
        </div>
        <Input
          name='comment'
          type='textarea'
          placeholder='Additional Comments'
          onChange={(e) => setComments(e)}
        ></Input>

        <Button
          color='success'
          label='Submit'
          onClick={submitReviewHandler()}
        />
      </Form>
    </div>
  );
};

export default WriteReviewStars;
