import axios from "axios";
import React from "react";
import Switch from "react-switch";
import "rsuite/lib/styles/index.less";
import AlertBox from "../alertBox/AlertBox";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
class ServiceListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.editing,
      checked: this.props.available,
      price: this.props.price,
    };
  }

  handleEditClick() {
    let priceUpdate = document.getElementById("update-price-id");
    priceUpdate.contentEditable = "true";
    this.setState({ editing: true });
  }

  updatePrice() {
    //    console.log(this.state.price);
    const URL =
      HOTEL_SERVICE_BASE_URL +
      "/hotels/" +
      this.props.hotelId +
      "/services/" +
      this.props.serviceId;
    let obj = {
      available: this.state.checked,
      deleted: this.props.deleted,
      hotelId: this.props.hotelId,
      name: this.props.name,
      price: this.state.price,
      serviceId: this.props.serviceId,
    };
    axios
      .put(URL, obj)
      .then((response) => {
        alert("Service Updated Successfully");
      })
      .catch((error) => {
        alert("Sorry, Please Try Again!");
      });
  }
  handlePriceChnage(event) {
    this.setState({ price: event.target.value });
  }
  render() {
    //    console.log(this.props);
    return (
      <div className="to-do-item">
        <span className="service-name">{this.props.name}</span>
        {/* <span id="update-price-id" className={this.state.editing ? 'price-updated': 'price-update'} onChange={this.handlePriceChnage.bind(this)}>{this.props.price}</span> */}
        <input
          id="update-price-id"
          className={this.state.editing ? "price-updated" : "price-update"}
          onChange={this.handlePriceChnage.bind(this)}
          value={this.state.price}
        />
        <span>
          <label>
            <Switch
              onChange={(event) => {
                this.setState({ checked: event });
              }}
              checked={this.state.checked}
            />
          </label>
        </span>
        {/* <span>
          <button
            className="btn--publicis-primary"
            type="button"
            onClick={this.handleEditClick.bind(this)}
          >
            EDIT PRICE
          </button>
        </span> */}
        <span>
          <button
            className="btn--publicis-primary"
            type="button"
            onClick={this.updatePrice.bind(this)}
          >
            UPDATE
          </button>
        </span>
      </div>
    );
  }
}
export default ServiceListItems;
