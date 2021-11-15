import React, { Component } from "react";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import "../../css/adminFun/admincomponent.css";
import "../../css/utility/button.css";
import { REVIEW_SERVICE_BASE_URL } from "../utility/Constant";
import axios from "axios";
import Cookies from "universal-cookie/lib";

class DeleteReview extends Component {
  constructor(props) {
    super(props);
  }

  deleteReview = async (event) => {
    event.preventDefault();
    const jwtTokenCookie = new Cookies();

    const jwt = jwtTokenCookie.get("jwtToken");

    await axios
      .delete(REVIEW_SERVICE_BASE_URL + "/review/" + this.props.reviewId, {
        headers: {
          Authorization: jwt,
        },
      })
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
          <div className="--form-card-publicis-header">
            Are you sure you want to Delete Review?
          </div>
          <div className="--form-card-publicis-body">
            <div className="--form-publicis-group">
              <Button
                cssClassName="btn--publicis-primary admin-button"
                label="Yes"
                handleClick={this.deleteReview}
              ></Button>
              <Button
                cssClassName="btn--publicis-primary admin-button"
                label="No"
                handleClick={(event) => {
                  this.props.flagchange();
                }}
              ></Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default DeleteReview;
