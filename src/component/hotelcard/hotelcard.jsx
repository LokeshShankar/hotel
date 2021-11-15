import { Fragment, Component } from "react";
import "../../css/hotelcard/hotelcard.css";
import GetStar from "../reviewDetails/GetStar";

class HotelCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      lowestPrice: "100000",
    };
  }

  getLowestPrice() {
    this.rooms = this.props.rooms;
    //    console.log(this.rooms);
    for (let i = 0; i < this.rooms.length; i++) {
      let temp = parseInt(this.rooms[i].roomPrice);
      if (parseInt(temp) < parseInt(this.state.lowestPrice)) {
        this.state.lowestPrice = temp;
      }
    }
  }

  render() {
    this.getLowestPrice();
    let amenities_ = this.props.hotelAmenities.splice(0, 2);
    //    console.log(amenities_);
    return (
      <div className="hotelCard">
        <div className="cardImage">
          <img src={this.props.hotelImgSrc} alt="Image of Hotel" />
        </div>
        <div className="cardInfo">
          <div className="infoHeader">
            <span className="hotelName">{this.props.hotelName}</span>
            <span className="rating-info">
              <GetStar rating={this.props.rating} />
            </span>
          </div>
          <div className="infoBody">
            <div className="infoBodyDetails">
              <div className="infoBodyLocation">
                <span
                  style={{ color: "red", fontSize: "18px", marginRight: "5px" }}
                  class="material-icons"
                >
                  place
                </span>
                <span className="address-value">
                  {this.props.hotelRegion}
                  <span>, </span>
                  {this.props.hotelCity} - {this.props.hotelPincode}
                </span>
              </div>

              <div className="infoBodyAmenities">
                {/* {amenities_.map((amenity, i) => (
                  <span className="amenities-list" key={i}>
                    {amenity}
                  </span>
                ))} */}
                {amenities_.map((amenity) => (
                  <li className="amenity">
                    <span
                      class="material-icons"
                      style={{
                        color: "green",
                        fontSize: "18px",
                        marginLeft: "5px",
                      }}
                    >
                      check_circle
                    </span>
                    <span> {amenity}</span>
                  </li>
                ))}
              </div>
            </div>
            {/* <div className="priceBody"> */}
            <div className="price">&#x20b9; {this.state.lowestPrice}</div>
            <br></br>
            <br></br>
            <div className="afterPrice">per night</div>
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

HotelCard.defaultProps = {
  hotelName: "",
  hotelCity: "",
  hotelPincode: "",
  hotelRegion: "",
  hotelImgSrc: "",
  hotelAmenities: [],
};

export default HotelCard;
