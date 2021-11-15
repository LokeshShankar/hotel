import React from "react";
import "../../css/hotelBillServices/HotelBillServices.css";
import CreateServiceItem from "./CreateServiceItem";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
import ServiceList from "./ServiceList";
import axios from "axios";
import Cookies from "universal-cookie";
// import AlertBox from "../alertBox/AlertBox";

class HotelBillServices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ServiceListItem: [],
      hotelId: 0,
    };
  }

  createItem(itemName, itemPrice) {
    //    console.log("hiii");
    let Array = this.state.ServiceListItem;
    Array.push({
      name: itemName,
      price: itemPrice,
      available: true,
      hotelId: this.state.hotelId,
    });
    this.state.ServiceListItem.unshift({
      name: itemName,
      price: itemPrice,
      available: true,
      hotelId: this.state.hotelId,
    });
    this.setState({
      ServiceListItem: Array,
    });
    const URL =
      HOTEL_SERVICE_BASE_URL + "/hotels/" + this.state.hotelId + "/services";
    let obj = {
      available: true,
      deleted: false,
      hotelId: this.state.hotelId,
      name: itemName,
      price: itemPrice,
      serviceId: 0,
    };
    axios
      .post(URL, obj)
      .then((response) => {
        alert("Service Created Successfully");
      })
      .catch((error) => {
        alert("Sorry, Please Try Again!");
      });
  }

  componentDidMount() {

    // let hotelid=14;
    //    console.log(this.props.history.location.state);
    // console.log(this.props.history);
    // const URL =
    //   HOTEL_SERVICE_BASE_URL +
    //   "/hotels/" +
    //   this.props.history.location.state.hotelid +
    //   "/services";

    //    console.log(URL);

    // let jwtTokenCookie = new Cookies();
    // axios
    //   .get(URL, {
    //     headers: {
    //       Authorization: jwtTokenCookie.get("jwtToken"),
    //     },
    //   })
    //   .then((response) => {
    //     //        console.log(response.data);
    //     this.setState({ ServiceListItem: response.data });
    //     this.setState({ hotelId: this.props.history.location.state.hotelid });
    //   })
    //   .catch((error) => {});
  }

  render() {
    return (
      <div className="--form-card-publicis hotel-bill-service-container">
        <div className="--form-card-publicis-header">Service List</div>
        <div className="--form-card-publicis-body">
          <CreateServiceItem
            ServiceListItem={this.state.ServiceListItem}
            hotelId={this.state.hotelId}
            createItem={this.createItem.bind(this)}
          />
          <ServiceList ServiceListItem={this.state.ServiceListItem} />
        </div>
      </div>
    );
  }
}
export default HotelBillServices;
