import React from "react";
import Button from "../utility/Button";
import "../../css/adminFun/admincomponent.css";
import axios from "axios";
import { HOTEL_SERVICE_BASE_URL, HOTEL_SERVICE_URL } from "../utility/Constant";
import Cookies from "universal-cookie/lib";
class DeleteHotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hotelId: props.location.state.hid, response: "" };
  }

  alertYes = async (event) => {
    event.preventDefault();
    let jwtTokenCookie = new Cookies(); ////Creating Cookie object

    await axios
      .delete(
        HOTEL_SERVICE_BASE_URL + "/user/hotel/delete/" + this.state.hotelId,
        {
          headers: {
            Authorization: jwtTokenCookie.get("jwtToken"),
          },
        }
      )
      .then((res) => {
        alert(res.data);
        this.setState({ response: res.data });
        this.props.history.push({
          pathname: "/admin",
        });
      })
      .catch((error) => {
        alert(error);
        this.setState({ response: error });
      });
    this.props.history.push({
      pathname: "/admin",
    });
  };

  alertNo = (event) => {
    event.preventDefault();
    this.setState({ response: "Not delete" });
    this.props.history.push({
      pathname: "/admin",
    });
  };

  render() {
    return (
      <div className="--form-card-publicis">
        <div className="--form-card-publicis-header">
          Confirm if you want to delete
        </div>
        <div className="--form-card-publicis-body">
          <div className="admin_new_hotel_btnGroup">
            <Button
              cssClassName="btn--publicis-secondary admin-button2"
              label="Yes"
              handleClick={this.alertYes}
            ></Button>
            <Button
              cssClassName="btn--publicis-primary admin-button2"
              label="No"
              handleClick={this.alertNo}
            ></Button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteHotel;
