import React from "react";
import "../../css/reviewDetails/RoomDetails.css";
import RoomAvailabilityPage from "../roomavailability/roomavailabilitypage";

function RoomDetails(props) {
  // console.log(props);
  return (
    <div className="room-container" id="roomDetails">
      <RoomAvailabilityPage
        hotel={props.hotel}
        history={props.history}
        searchState={props.searchState}
      ></RoomAvailabilityPage>
    </div>
  );
}

export default RoomDetails;
