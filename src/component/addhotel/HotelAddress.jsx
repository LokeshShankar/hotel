import React from "react";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import "../../css/adminFun/admincomponent.css";
import "../../css/utility/button.css";
import { Multiselect } from "multiselect-react-dropdown";
import { AMENITIES } from "../utility/Constant";
import Geocode from "react-geocode";

class HotelAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localAddress: props.localAddress,
      city: props.city,
      region: props.region,
      pincode: props.pincode,
      latitude: props.latitude,
      longitude: props.longitude,
      landmarks: props.landmarks,
      selectedAmenities: props.selectedAmenities,
      objectArray: AMENITIES,
      errors: {},
    };
  }

  updateChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  checkErrorsHotelAddress = (event) => {
    let noErrors = true;
    let errors = {};
    // Local address
    if (this.state.localAddress === "") {
      noErrors = false;
      errors["localAddress"] = "Local address can't be empty";
    }

    if (this.state.region === "") {
      noErrors = false;
      errors["region"] = "Region can't be empty";
    }

    if (this.state.landmarks === "") {
      noErrors = false;
      errors["landmarks"] = "Landmarks can't be empty";
    }

    // City
    var city_pattern = new RegExp(/^[a-zA-Z ]*$/);
    if (this.state.city === "") {
      noErrors = false;
      errors["city"] = "City name can't be empty";
    } else if (!city_pattern.test(this.state.city)) {
      noErrors = false;
      errors["city"] = "Invalid city name";
    }

    // Pincode
    var pincode_pattern = new RegExp(/^\d+$/);
    if (
      this.state.pincode.length !== 6 ||
      !pincode_pattern.test(this.state.pincode)
    ) {
      noErrors = false;
      errors["pincode"] = "Invalid pincode";
    }

    this.setState({ errors: errors });
    return noErrors;
  };

  multiSelect = (event) => {
    this.setState({ selectedAmenities: event });
  };

  findGeocode = async (address) => {
    Geocode.setApiKey("AIzaSyCLu6EBD1cEdhhYluZok4lTLbig-2YIrc0");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    let geoCode = {};
    return new Promise((resolve, reject) => {
      Geocode.fromAddress(address).then(
        (response) => {
          // console.log(response);
          geoCode = response.results[0].geometry.location;
          // console.log(geoCode);
          this.setState({ latitude: geoCode.lat, longitude: geoCode.lng });
          resolve(geoCode);
        },
        (error) => {
          //          console.error(error);
          reject(error);
        }
      );
    });
  };

  roomDetails = (event) => {
    event.preventDefault();
    // console.log("hello");
    if (this.checkErrorsHotelAddress(event)) {
      let address =
        this.state.localAddress +
        "," +
        this.state.region +
        "," +
        this.state.city +
        "," +
        this.state.pincode;
      // let address = "R 68 Street No 20 Brahmpuri Delhi 110053";
      this.findGeocode(address)
        .then((geoCode) => {
          //          console.log("Return geoCode", geoCode);
          // console.log("Return ", this.state);
          this.props.hotelAddressCallback(this.state);
        })
        .catch(console.error());
    }
  };

  render() {
    return (
      <div className="--form-card-publicis">
        <form action="">
          {/* <h2>Hotel Address</h2> */}
          <div className="--form-card-publicis-header">Hotel Address</div>
          <div className="--form-card-publicis-body">
            <div className="--form-publicis-group">
              <Input
                name="localAddress"
                // className="myInput"
                className="--form-publicis-input"
                label="Local Address *"
                placeholder="Local Address"
                value={this.state.localAddress}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["localAddress"] &&
                this.state.errors["localAddress"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["localAddress"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="region"
                // className="myInput"
                className="--form-publicis-input"
                placeholder="Region"
                label="Region *"
                value={this.state.region}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["region"] &&
                this.state.errors["region"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["region"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="city"
                // className="myInput"
                className="--form-publicis-input"
                placeholder="City"
                label="City *"
                value={this.state.city}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["city"] &&
                this.state.errors["city"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["city"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="pincode"
                // className="myInput"
                className="--form-publicis-input"
                label="Pincode *"
                placeholder="Pincode"
                value={this.state.pincode}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["pincode"] &&
                this.state.errors["pincode"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["pincode"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <Input
                name="landmarks"
                // className="myInput"
                className="--form-publicis-input"
                placeholder="Important Landmarks"
                label="Important Landmarks *"
                value={this.state.landmarks}
                onChange={this.updateChange}
              ></Input>
              {this.state.errors["landmarks"] &&
                this.state.errors["landmarks"] !== "" && (
                  <p className="error-name-admin">
                    {this.state.errors["landmarks"]}
                  </p>
                )}
            </div>
            <div className="--form-publicis-group">
              <label>Hotel amenities *</label>

              <div className="multiselect">
                <Multiselect
                  options={this.state.objectArray}
                  displayValue="key"
                  onSelect={this.multiSelect}
                  onRemove={this.multiSelect}
                  selectedValues={this.state.selectedAmenities}
                />
              </div>
            </div>
            <div className="admin_hotel_btnGroup">
              <Button
                cssClassName="btn--publicis-secondary-outline admin-button2"
                label="Back"
                handleClick={this.props.fun}
              ></Button>
              <Button
                cssClassName="btn--publicis-primary admin-button2"
                label="Next"
                handleClick={this.roomDetails}
              ></Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default HotelAddress;
