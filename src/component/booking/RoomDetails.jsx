import React from "react";
import "../../css/booking/roomdetails.css";

class RoomDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="roomCard">
        <div className="roomTypeName">{this.props.roomType}</div>
        <div className="details">
          <div className="inclusions">
            {this.props.roomInclusions.map((inclusion, i) => (
              <div key={i}>
                {" "}
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
                {inclusion}{" "}
              </div>
            ))}
          </div>

          <div className="book_page_room">
            <p>Max persons: {this.props.maxPersons} </p>
            <p>Rooms selected: {this.props.roomCount} </p>
            <p>No of Guests: {this.props.guestCount} </p>
            <div className="select_room_room_rate">
              <div>Rs. {this.props.roomPrice}</div>
              <div className="per_night">/ Per Night</div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

export default RoomDetails;
