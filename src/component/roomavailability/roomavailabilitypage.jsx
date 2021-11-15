import { Fragment, Component } from "react";
import axios from "axios";
import "../../css/userlandingpage/userlandingpage.css";
import "../../css/userlandingpage/landingcard.css";
import "../../css/reviewDetails/Slideshow.css";
import "../../css/roomavailability/roomavailabilitypage.css";
import RoomTypeDetailCard from "../roomavailability/RoomTypeDetailCard";
import Button from "../utility/Button";
import "../../css/roomavailability/roomavailabilitypage.css";
import Cookies from "universal-cookie/lib";

class RoomAvailabilityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchState: props.searchState,
      results: props.hotel.rooms.map((room) => {
        let inclusions = room.inclusions.split(",");
        return {
          roomType: room.roomTypeName,
          maxPersons: room.roomCapacity,
          totalRoomCount: room.totalRoomCount,
          roomCount: 0,
          roomPrice: room.roomPrice,
          roomInclusions: inclusions,
          maxGuestCount: 0,
          guestCount: 0,
        };
      }),
      taxRate: 10,
      checkInDate: props.searchState.startDate,
      checkOutDate: props.searchState.endDate,
      hotelId: props.hotel.hotel_id,
    };
  }

  checkJwtToken = () => {
    let jwtTokenCookie = new Cookies();
    let jwtToken = jwtTokenCookie.get("jwtToken");
    if (!jwtToken) return 1;
  };

  handleSelect = (roomCount, index) => {
    let temp = this.state.results;
    temp[index].roomCount = roomCount;
    this.setState({ results: temp });
  };

  handle = (guestCount, index) => {
    let temp = this.state.results;
    temp[index].guestCount = guestCount;
    //    console.log(temp);
    this.setState({ results: temp });
  };

  findSelectedRooms = (results) => {
    let arr = [];
    results.map((room) => {
      if (room.roomCount > 0) {
        arr.push(room);
      }
    });

    return arr;
  };

  booking = (e) => {
    if (this.checkJwtToken() === 1) {
      alert("Please login or register to book your stay right away");
      this.props.history.push({
        pathname: "/signin",
      });
      return;
    }

    e.preventDefault();
    let selectedRooms = this.findSelectedRooms(this.state.results);
    if (selectedRooms.length === 0) {
      alert("please select any room");
      return;
    }
    for (let i = 0; i < selectedRooms.length; i++) {
      if (
        selectedRooms[i].maxPersons * selectedRooms[i].roomCount <
        selectedRooms[i].guestCount
      ) {
        alert(
          "Max Guest allowed per room is " +
            selectedRooms[i].maxPersons +
            ".Please Enter No of Guest Accordingly"
        );
        return;
      }
    }
    this.props.history.push({
      pathname: "/booking",
      state: {
        results: selectedRooms,
        taxRate: this.state.taxRate,
        checkInDate: this.state.checkInDate,
        checkOutDate: this.state.checkOutDate,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        hotelId: this.state.hotelId,
      },
    });
  };

  render() {
    //    console.log(this.state);
    return (
      <div className="roomsAvailabilityPage">
        <div className="room_details_header_container">
          <div className="room_details_header">Select Rooms</div>
        </div>
        <div className="rooms">
          {this.state.results.map((room, i) => {
            return (
              <RoomTypeDetailCard
                roomDetails={room}
                selectCallBack={(e) => this.handleSelect(e, i)}
                selectCall={(e) => this.handle(e, i)}
              />
            );
          })}
        </div>

        <div className="continue-btn">
          <Button
            cssClassName="btn--publicis-success continue_book_btn"
            label="Continue to Book"
            handleClick={this.booking}
          ></Button>
        </div>
      </div>
    );
  }
}

export default RoomAvailabilityPage;
