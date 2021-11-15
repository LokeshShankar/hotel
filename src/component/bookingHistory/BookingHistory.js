import { React, useState, useEffect } from "react";
import "../../css/bookingHistory/BookingHistory.css";
import BookDetails from "./BookingDetails";
import axios from "axios";
import Cookies from "universal-cookie/lib";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";

function BookingHistory(props) {
  return (
    <div>
      {props.results.map((booking) => {
        return (
          <div key={booking.booking_id}>
            <BookDetails
              role={props.role}
              bookingtype={props.bookingtype}
              booking={booking}
              history={props.history}
              hotelId={props.hotelId}
            />
          </div>
        );
      })}
    </div>
  );
}

export default BookingHistory;
