import React, { Component, useEffect, useState, useRef } from "react";
import "../../css/reviewDetails/ReviewCard.css";
import GetStar from "./GetStar";
import Cookies from "universal-cookie/lib";
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReview";
import Button from "../utility/Button";

function ReviewCard(props) {
  //   let name =
  //     props.review.name.charAt(0) +
  //     props.review.name.charAt(1) +
  //     props.review.name.charAt(2) +
  //     props.review.name.charAt(3) +
  //     props.review.name.charAt(4);

  //let name = props.review.name.charAt(0) + props.review.name.charAt(1) + props.review.name.charAt(2) +
  //props.review.name.charAt(3) + props.review.name.charAt(4);

  function parseJwt(email) {
    const jwtTokenCookie = new Cookies();

    const token = jwtTokenCookie.get("jwtToken");
    if (!token) {
      return false;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64)).email == email;
  }

  const [flag, setFlag] = useState(0);
  function flagchange() {
    setFlag(0);
  }
  if (flag == 1) {
    return (
      <EditReview flagchange={flagchange} review={props.review}></EditReview>
    );
  } else if (flag == 2) {
    return (
      <DeleteReview
        flagchange={flagchange}
        reviewId={props.review.reviewId}
      ></DeleteReview>
    );
  } else
    return (
      <div className="review-card">
        <div className="profileImage">{props.review.userName.charAt(0)}</div>
        <div className="review-name">{props.review.userName}</div>
        <div className="review-rating">
          <GetStar rating={props.review.rating} />
        </div>
        <div>
          <small className="time">
            Posted on : {props.review.reviewDate.split(" ")[0]}
          </small>
        </div>
        <p className="review-body">{props.review.review}</p>
        {parseJwt(props.review.email) ? (
          <div class="review-card-button">
            <Button
              cssClassName="btn--publicis-secondary-outline "
              type="button"
              label="Edit Review"
              handleClick={(event) => {
                setFlag(1);
              }}
            ></Button>

            <Button
              cssClassName="btn--publicis-secondary-outline "
              type="button"
              label="Delete Review"
              handleClick={(event) => {
                setFlag(2);
              }}
            ></Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
}

export default ReviewCard;
