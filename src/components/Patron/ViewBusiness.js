import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Toast, ToastBody, ToastHeader } from "reactstrap";
import ReviewItem from "../Review/ReviewItem";
import "./ViewBusiness.css";
import { Redirect } from "react-router-dom";

const ViewBusiness = (props) => {
  let displayReviewUrl = "/react-backend/displayBusinessReview.php";
  let businessInfoUrl = "/react-backend/displayBusinessInfo.php";
  //let insertReviewUrl = "/react-backend/patron/insertReview.php";
  let authReview = "/react-backend/patron/authorizeReview.php";

  const [reviews, setReviews] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [message, setMessage] = useState();
  //const [authorize, setAuthorize] = useState([]);

  useEffect(() => {
    // Get Reviews
    axios
      .get(displayReviewUrl)
      .then((json) => {
        setReviews(json.data);
        console.log(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // Get Business Data
    axios
      .get(businessInfoUrl)
      .then((json) => {
        setBusinessData(json.data);
        console.log(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const AuthorizeReview = (e) => {
    axios
      .post(authReview, { id: businessData })
      .then((res) => {
        console.log("Business ID: " + businessData.id);
        console.log(res);
        setMessage("Successful");
      })
      .catch((err) => {
        console.log(err);
        setMessage("You must be a patron of this business and logged in");
      });
  };

  const renderTable = () => {
    return (
      <div>
        <span id='small-heading'>Reviews</span>
        <ul
          id='scroll-list'
          tableindex='0'
          role='listbox'
          aria-labelledby='small-heading'
        >
          <li>
            {reviews.map((r) => {
              return (
                <ReviewItem
                  name={r.patron_name}
                  maskRating={r.mask_rating}
                  saniRating={r.sanitize_rating}
                  distRating={r.social_distance_rating}
                  review={r.comment}
                />
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className='ViewBusiness'>
      <section>
        <aside>
          <Toast>
            <ToastHeader>
              <h1>Contact Info</h1>
            </ToastHeader>
            <ToastBody>
              <dl>
                <dt>Address</dt>
                <dd>
                  {businessData.street}, {businessData.town} {businessData.zip}
                </dd>
                <dt>Phone</dt>
                <dd>{businessData.phone}</dd>
                <dt>Contact Email</dt>
                <dd>{businessData.email}</dd>
              </dl>
            </ToastBody>
          </Toast>
        </aside>
        <h1>{businessData.name}</h1>
        <h2>{businessData.type}</h2>

        <p className={message === "Successful Login" ? "suc" : "fail"}>
          {message}
        </p>
        <Button
          onClick={() => AuthorizeReview(businessData)}
          color='success'
          // tag={Link}
          // to='/WriteReview'
        >
          Write Review
        </Button>
        {message === "Successful" && <Redirect to='/WriteReview' />}

        {renderTable()}
        <div></div>
      </section>
    </div>
  );
};

export default ViewBusiness;
