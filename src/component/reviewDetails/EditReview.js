import React, { Component } from "react";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import "../../css/adminFun/admincomponent.css";
import "../../css/utility/button.css";
import { REVIEW_SERVICE_BASE_URL } from "../utility/Constant";
import axios from "axios";
import Cookies from "universal-cookie/lib";

export let obj;
class EditReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: props.review.rating,
      review: props.review.review,
    };
  }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  editReview = async (event) => {
    event.preventDefault();
    const jwtTokenCookie = new Cookies();

    const jwt = jwtTokenCookie.get("jwtToken");

    obj = {
      rating: this.state.rating,
      review: this.state.review,
    };
    await axios
      .put(
        REVIEW_SERVICE_BASE_URL + "/hotel/review/" + this.props.review.reviewId,
        obj,
        {
          headers: {
            Authorization: jwt,
          },
        }
      )
      .then((response) => {
        alert(response.data);
      })
      .catch(() => {});
    this.props.flagchange();
  };

  render() {
    return (
      <div className="--form-card-publicis">
        <form action="">
          <div className="--form-card-publicis-header">Edit your Review </div>
          <div className="--form-card-publicis-body">
            <div className="--form-publicis-group">
              <Input
                type="text"
                name="review"
                className="--form-publicis-input"
                value={this.state.review}
                label="Review"
                placeholder="Edit your Review"
                onChange={this.handleInputChange}
              />
              <Input
                name="rating"
                type="number"
                min="1"
                max="5"
                className="--form-publicis-input"
                placeholder="Rate out of 5"
                label="Rating"
                value={this.state.rating}
                onChange={this.handleInputChange}
              ></Input>
            </div>

            <Button
              cssClassName="btn--publicis-primary admin-button"
              label="Submit Review"
              handleClick={this.editReview}
            ></Button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditReview;
