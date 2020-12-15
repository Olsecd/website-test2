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
  const [message, setMessage] = useState("");

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
        setMessage("Successful");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed");
      });
  };

  return (
    <div>
      <AvForm className='formRegister' onValidSubmit={registerHandler}>
        <AvField
          label='Mask Rating (1-5 stars)'
          name='mask_rating'
          type='number'
          min='1'
          max='5'
          onChange={(e) => {
            onChange(e);
          }}
          required
        ></AvField>
        <AvField
          label='Sanitizer Rating (1-5 stars)'
          name='sanitize_rating'
          type='number'
          min='1'
          max='5'
          onChange={(e) => {
            onChange(e);
          }}
          required
        ></AvField>
        <AvField
          label='Social Distance Rating (1-5 stars)'
          name='social_distance_rating'
          type='number'
          min='1'
          max='5'
          onChange={(e) => {
            onChange(e);
          }}
          required
        ></AvField>
        <AvField
          label='Additional Comments'
          type='textarea'
          name='comment'
          onChange={(e) => {
            onChange(e);
          }}
        ></AvField>
        <p className={message === "Successful" ? "suc" : "fail"}>{message}</p>
        <Button>Submit</Button>
        <Button tag={Link} to='/ViewBusiness'>
          Back
        </Button>{" "}
      </AvForm>
    </div>
  );
};

export default WriteReview;
