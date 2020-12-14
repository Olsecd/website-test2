import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link } from "react-router-dom";
import "./WriteReview.css";

const WriteReview = () => {
  const [review, setReview] = useState({
    mask_rating: "",
    sanitize_rating: "",
    social_distance_rating: "",
    comment: "",
  });

  const onChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
    console.log(review);
  };

  const registerHandler = () => {
    let postURL = "/react-backend/patron/insertReviewFile.php";
    let formData = new FormData();
    formData.append("mask_rating", review.mask_rating);
    formData.append("sanitize_rating", review.sanitize_rating);
    formData.append("social_distance_rating", review.social_distance_rating);
    formData.append("comment", review.comment);

    axios
      .post(postURL, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <AvForm className='formRegister' onValidSubmit={registerHandler}>
        <AvField
          label='Mask Rating'
          name='mask_rating'
          type='text'
          onChange={(e) => {
            onChange(e);
          }}
        ></AvField>
        <AvField
          label='Sanitizer Rating'
          name='sanitize_rating'
          type='text'
          onChange={(e) => {
            onChange(e);
          }}
        ></AvField>
        <AvField
          label='Social Distance Rating'
          name='social_distance_rating'
          type='text'
          onChange={(e) => {
            onChange(e);
          }}
        ></AvField>
        <AvField
          label='Additional Comments'
          type='textarea'
          name='comment'
          onChange={(e) => {
            onChange(e);
          }}
        ></AvField>
        <Button>Submit</Button>
      </AvForm>
    </div>
  );
};

export default WriteReview;
