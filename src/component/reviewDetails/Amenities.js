import React from "react";
import "../../css/reviewDetails/Amenities.css";

function Amenities(props) {
  let amenities = props.hotel.amenities.split(",");
  return (
    <div className="amenities-container" id="amenities">
      <h4 className="amenities-head">Amenities</h4>
      <hr></hr>
    </div>
  );
}

export default Amenities;
