import { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie/lib";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
import BookingHistory from "./BookingHistory";
import Pagination from "../paginationandreport/Pagination";

class UserBookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getData = () => {
    const jwtTokenCookie = new Cookies();
    let jwtToken = jwtTokenCookie.get("jwtToken");
    axios
      .get(
        HOTEL_SERVICE_BASE_URL + "/booking/bookings/user",
        // "http://hotelmanagement-1089400967.us-east-1.elb.amazonaws.com/hotel-service/booking/bookings/user",
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      )
      .then((response) => {
        let sortedData = response.data;
        sortedData.sort((a, b) => b.bookingId - a.bookingId);
        //        console.log(sortedData);
        this.setState({ data: sortedData });
      })
      .catch((error) => {
        //        console.log("error is ", error);
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <Pagination data={this.state.data}>
          <BookingHistory role="user" history={this.props.history} />
        </Pagination>
      </div>
    );
  }
}

export default UserBookingHistory;
