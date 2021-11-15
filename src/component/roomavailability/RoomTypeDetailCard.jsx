import React from "react";
import { Fragment, Component } from "react";

import "../../css/userlandingpage/userlandingpage.css";
import "../../css/userlandingpage/landingcard.css";
import "../../css/reviewDetails/Slideshow.css";
import "../../css/roomavailability/roomavailabilitypage.css";
import "../roomavailability/RoomTypeDetailCard.jsx";

class RoomTypeDetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomDetails: { ...props.roomDetails },
      guestCount:0,
      maxGuestCount: 0
    };
    
  }


  
  


  onTrigger = (event) => {
    this.props.selectCallBack(event.target.value);
    let newRoomDetails = {
      ...this.state.roomDetails,
      roomCount: parseInt(event.target.value),
      
    };
   
    
   
    
    this.setState({ roomDetails: newRoomDetails});
    // var updatedMaxGuestCount= this.state.roomDetails.maxPersons*parseInt(this.state.roomDetails.roomCount)
    
    // console.log(this.state.roomDetails.maxPersons)
    // console.log(this.state.roomDetails.roomCount)

    // this.setState({maxGuestCount: updatedMaxGuestCount})
    // console.log(this.state.maxGuestCount);
    
  };

  onTrig=(event)=>{
    this.props.selectCall(event.target.value);
    let guestCount=parseInt(event.target.value);
    this.setState({guestCount:guestCount});
  }
  





  render() {
    return (
      <div className="--form-card-publicis">
        <div className="--form-card-publicis-header">
          {this.state.roomDetails.roomType}
        </div>
        <div className="roomOptionsWrapper">
          <div>
            <div className="roomInclusions">
              {this.state.roomDetails.roomInclusions.map((inclusion, i) => (
                <div key={i} class="selectroom_inclusion">
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

            <div className= "maxPersonsAllowed">Guest limit per room: {this.state.roomDetails.maxPersons}
            </div>
            <br></br>

            <div className="select_rooms">
              <div className="book">
                Select Number of Rooms
                <input className= "roomCounter"
                  type="number"
                  value={this.state.roomDetails.roomCount}
                  min="0"
                  max="5"
                  step="1"
                  onChange={this.onTrigger}
                ></input>

              </div>
              

              {/* <div className= "maxGuestCount">
                    <p>Maximum number of Guests: {this.state.maxGuestCount}</p>
                     

                     </div> */}
            </div>
            <br/>
            <div className="select_rooms">
              <div className="book">
                 Number of Guests
                <input className= "roomCounter"
                  type="number"
                  value={this.state.guestCount}
                  min="0"
                  max="5"
                  step="1"
                  onChange={this.onTrig}
                ></input>

              </div>
              

              {/* <div className= "maxGuestCount">
                    <p>Maximum number of Guests: {this.state.maxGuestCount}</p>
                     

                     </div> */}
            </div>
          </div>

          <div className="select_room_room_rate">
            <div>Rs. {this.state.roomDetails.roomPrice}</div>
            <div className="per_night">/ Per Night</div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomTypeDetailCard;
