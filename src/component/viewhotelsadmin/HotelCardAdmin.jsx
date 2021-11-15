import { Fragment, Component } from "react";
import "../../css/viewhotelsadmin/hotelcardadmin.css";
import "../../css/viewhotelsadmin/toggleswitchadmin.css";
import Button from "../utility/Button";
import axios from "axios";
import ToggleSwitchAdmin from "./ToggleSwitchAdmin";

class HotelCardAdmin extends Component {
  render() {
    let amenities = this.props.hotelAmenities.split(",");
    let amenitiesrender = "";
    if (amenities.length > 2) {
      amenitiesrender = (
        <ul>
          <li key={amenities[0]}>{amenities[0]}</li>
          <li key={amenities[1]}>{amenities[1]}</li>
        </ul>
      );
    } else {
      amenitiesrender = this.props.hotelAmenities
        .split(",")
        .map((amenity) => <li key={amenity}>{amenity}</li>);
    }
    return (
      <>
        <div className="cardImageAdmin">
          <img src={this.props.hotelImgSrc} alt="Hotel" />
        </div>
        <div className="infoBodyAdmin">
          <div className="infoHeaderAdmin">
            <div className="hotelNameAdmin">{this.props.hotelName}</div>
          </div>
          <div className="infoBodyLocationAdmin">
            <span
              style={{ color: "red", fontSize: "20px", marginRight: "5px" }}
              class="material-icons"
            >
              place
            </span>
            {this.props.hotelRegion} <br />
            <div style={{ paddingLeft: "1em" }}>
              {this.props.hotelCity} - {this.props.hotelPincode}
            </div>
          </div>
          <div className="infoBodyAmenitiesAdmin">
            {/* <div className="infoBodyAmenitiesAdmin-heading">
              {" "}
              Hotel Amenities:
            </div> */}
            {/* {amenitiesrender} */}
            {amenities.map((amenity) => (
              <li className="amenity">
                <span
                  class="material-icons"
                  style={{
                    color: "green",
                    fontSize: "18px",
                    marginRight: "5px",
                  }}
                >
                  check_circle
                </span>
                <span className="amenities-value"> {amenity}</span>
              </li>
            ))}
          </div>

          <div className="priceAdmin">
            Rs. {this.props.hotelPrice}
            <span
              style={{ color: "gray", fontSize: "14px", fontWeight: "600" }}
            >
              /Per Night
            </span>
          </div>
        </div>
        <div className="rightcontainerAdmin">
          <div className="toggleAdmin">
            Hotel Visiblity:
            <ToggleSwitchAdmin
              key={this.props.hotelid}
              checked={this.props.hotelVisibility}
              toggleVisibility={this.props.toggleVisibility}
              hotelid={this.props.hotelid}
            />
          </div>
          <div className="adminhotel_btn_flex_outer">
            <div className="adminhotel_btn_flex">
              <Button
                cssClassName="btn--publicis-primary"
                handleClick={() => this.props.edit(this.props.hotelid)}
                label="Edit "
              />
              <Button
                cssClassName="btn--publicis-primary"
                handleClick={() => this.props.delete(this.props.hotelid)}
                label="Delete"
              />
              <Button
                cssClassName="btn--publicis-primary"
                handleClick={() =>
                  this.props.showBookingsHotel(this.props.hotelid)
                }
                label="Show Bookings"
              />
            </div>
            <div className="adminhotel_btn_flex">
              <Button
                cssClassName="btn--publicis-primary"
                handleClick={() =>
                  this.props.showAnalysisHotel(this.props.hotelid)
                }
                label="Show Analysis"
              />

              {/* Add hotel bill service button added by Lokesh */}

              <Button
                cssClassName="btn--publicis-primary"
                handleClick={() =>
                  this.props.showHotelServices(this.props.hotelid)
                }
                label="Hotel Services"
              />
              <Button
                cssClassName="btn--publicis-primary"
                handleClick={() =>
                  this.props.showCommission(this.props.hotelid)
                }
                label="Show Commission"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HotelCardAdmin;
