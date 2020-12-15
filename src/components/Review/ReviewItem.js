import React from "react";
import { FaUser } from "react-icons/fa";
import DisplayRating from "./DisplayRating";
import { Chip } from "@material-ui/core/";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  return (
    <div id='padding'>
      <div id='wrapper'>
        <div id='first'>
          <Chip
            size='small'
            icon={<FaUser />}
            label={props.name}
            color='primary'
          />
          <p />
          Sanitizer: <DisplayRating rating={props.saniRating} />
          Masks: <DisplayRating rating={props.maskRating} />
          Social Distance: <DisplayRating rating={props.distRating} />
        </div>
        <div id='second'>
          <textarea
            readOnly={true}
            cols={30}
            class='w3-container w3-pale-blue w3-leftbar w3-border-blue'
          >
            {props.review}
          </textarea>
        </div>
      </div>
    </div>
  );
};
export default ReviewItem;
