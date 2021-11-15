import React from "react";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import "../../css/adminFun/addadmin.css";
import "../../css/utility/button.css";
import axios from "axios";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
import "../../css/theme.css";
class BillEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booking_id: "",
      service: "",
      discount: 0,
      quantity: 1,
      price: 0,
      errors: {},
      response: "",
      err: "",
      serv_id: "",
      // zservices: [],
      services: [],
      hotelId: this.props.location.state.hotelId,
    };
    //    console.log(this.state);
  }
  componentDidMount() {
    // const URL = 'http://hotelmanagement-1089400967.us-east-1.elb.amazonaws.com/hotel-service/hotels/14/services?available=true'
    const URL =
      HOTEL_SERVICE_BASE_URL +
      "/hotels/" +
      this.state.hotelId +
      "/services?available=true";
    axios.get(URL).then((res) => {
      //      console.dir(res.data);
      this.setState({ services: res.data });
      // console.dir(this.state.zservices)
      // this.setState({zservices : zzservices})
    });
  }
  updateChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  selectChange = (event) => {
    event.preventDefault();
    //    console.log(event.target.value);
    let i = Number(event.target.value) - 1;
    let service = this.state.services[i];
    //    console.log(service);
    this.setState({
      service,
      serv_id: service.serviceId,
      price: service.price,
    });
  };
  checkErrorsBillEntry = (event) => {
    let noErrors = true;
    let errors = {};
    // let s = document.getElementById('serv');

    // Service
    if (this.state.serv_id === "" || this.state.serv_id === "0") {
      noErrors = false;
      errors["service"] = "Service can't be empty";
    }

    // Quantity
    if (this.state.quantity === "") {
      noErrors = false;
      errors["quantity"] = "Quantity can't be empty";
    }
    // // Discount
    // if (this.state.discount === "") {
    //     noErrors = false;
    //     errors["discount"] = "Discount can't be empty";
    // }
    this.setState({ errors });
    return noErrors;
  };
  submitBillDetails = async (event) => {
    event.preventDefault();
    if (this.checkErrorsBillEntry(event)) {
      let object = {
        bookingId: this.props.location.state.bookingId,
        service: this.state.service,
        discount: this.state.discount,
        quantity: this.state.quantity,
        price: this.state.price,
      };
      //      console.log(object);
      let bill_entry_url =
        HOTEL_SERVICE_BASE_URL + "/bookings/" + object.bookingId + "/bills/";
      //      console.log(bill_entry_url);
      await axios
        .post(bill_entry_url, object)
        .then((response) => {
          this.setState({ response: response.data });
          alert("Bill Entry inserted");
          this.props.history.push({
            pathname: "/admin/allbills",
            state: {
              bookingId: object.bookingId,
            },
          });
        })
        .catch((error) => {
          //          console.log(error + " this is error");
          this.state.err = error;
          //this.setState({err:error})
        });
    } else {
      //      console.log(this.state.errors);
      // alert(JSON.stringify(this.state.errors));
    }
  };
  render() {
    return (
      <div className="--form-card-publicis">
        <form action="">
          <div className="--form-card-publicis-header">Bill Entry</div>
          <div className="--form-card-publicis-body">
            <div className="--form-publicis-group">
              <label htmlFor="serv_id">Service *</label>
              <select
                id="serv"
                onChange={this.selectChange}
                name="serv_id"
                className="--form-publicis-input"
              >
                <option value="0">Select..</option>
                {this.state.services.map((service, index) => {
                  return (
                    <option key={index + 1} value={index + 1}>
                      {service.name}
                    </option>
                  );
                })}
              </select>
              {this.state.errors["service"] &&
                this.state.errors["service"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["service"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="price"
                className="--form-publicis-input"
                label="Price "
                value={this.state.price}
                onChange={this.updateChange}
              ></Input>
              {/*{this.state.errors["quantity"] && this.state.errors["quantity"] !== "" && (*/}
              {/*    <p className="error-name-admin">{this.state.errors["quantity"]}</p> )}*/}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="quantity"
                className="--form-publicis-input"
                label="Quantity *"
                value={this.state.quantity}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["quantity"] &&
                this.state.errors["quantity"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["quantity"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="discount"
                className="--form-publicis-input"
                label="Discount "
                value={this.state.discount}
                onChange={this.updateChange}
              ></Input>
              {/*{this.state.errors["discount"] && this.state.errors["discount"] !== "" && (*/}
              {/*    <p className="error-name-admin">{this.state.errors["discount"]}</p> )}*/}
            </div>
            <Button
              cssClassName="btn--publicis-primary bill_entry_button"
              label="Submit"
              handleClick={this.submitBillDetails}
            ></Button>
          </div>
        </form>
      </div>
    );
  }
}

export default BillEntry;
