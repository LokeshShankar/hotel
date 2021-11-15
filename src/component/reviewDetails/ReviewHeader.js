import React from "react";
import { Link } from "react-scroll";
import "../../css/reviewDetails/Header.css";
import "../../css/reviewDetails/Amenities.css";
import GetStar from "./GetStar";

function Header(props) {
  const header = {
    hotelname: props.hotel.hotelName || "Paradise Island Resort & Spa Maldives",
    hoteladdress:
      props.hotel.region + ", " + props.hotel.city ||
      "8/32,Wea,Opposite MCD Lift Parking, Behind Jivitesh Hotel",
    hotelReview: props.hotel.rating || 0,
  };

  let amenities = props.hotel.amenities;

  return (
    // <div>
    //   <div>{header.hotelname}</div>
    // </div>

    <div className="reviewDetails_hotel_container">
      <div>
        <div className="hotel-name">{header.hotelname}</div>
        <div className="reviewDetails_hotel_addRate">
          <span style={{ color: "red" }} class="material-icons">
            place
          </span>
          <div className="hotel-address">{header.hoteladdress}</div>
          <GetStar rating={header.hotelReview} />
        </div>
        <div class="hotel_amenities">
          {amenities.map((amenity) => (
            <span className="amenity">
              <span class="material-icons" style={{ color: "green" }}>
                check_circle
              </span>
              <span className="amenities-value"> {amenity}</span>
            </span>
          ))}
        </div>
        <div class="hotel_checks">
          <div class="hotel_check">
            <span className="check">Check-in time</span>
            {props.hotel.checkInTime} (24-hrs)
          </div>
          <div class="hotel_check">
            <span className="check">Check-out time</span>
            {props.hotel.checkOutTime} (24-hrs)
          </div>
        </div>
        <div class="hotel_contact">
          <div class="hotel_contact_email">
            <span class="material-icons" style={{ color: "#fe414d" }}>
              email
            </span>{" "}
            {props.hotel.email}
          </div>
          <div class="hotel_contact_phone">
            <span class="material-icons" style={{ color: "#fe414d" }}>
              call
            </span>{" "}
            {props.hotel.phone}
          </div>
        </div>
      </div>
      <div className="hotelDetails_buttons">
        <Link to="roomDetails" activeClass="active" spy={true} smooth={true}>
          <button className="btn--publicis-secondary-outline viewrooms_btn">
            View Rooms
          </button>
        </Link>
        <Link to="reviewDetails" activeClass="active" spy={true} smooth={true}>
          <button className="btn--publicis-secondary-outline viewrooms_btn">
            View Reviews
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
