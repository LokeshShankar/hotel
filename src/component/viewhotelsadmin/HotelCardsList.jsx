import { Component } from "react";
import HotelCardAdmin from "./HotelCardAdmin";

class HotelCardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  minprice = (rooms) => {
    let minr = rooms[0].roomPrice;
    rooms.map((room) => {
      minr = minr < room.roomPrice ? minr : room.roomPrice;
    });
    return minr;
  };
  render() {
    let defaultImg =
      "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";
    return this.props.results.map((hotel) => {
      //      console.log(hotel);
      return (
        <div
          key={hotel.hotelId}
          hotelid={hotel.hotelId}
          className="--form-card-publicis hotelCardAdmin"
        >
          <HotelCardAdmin
            hotelid={hotel.hotelId}
            toggleVisibility={this.props.toggleVisibility}
            hotelName={hotel.hotelName}
            hotelPrice={this.minprice(hotel.rooms)}
            hotelCity={hotel.city}
            hotelPincode={hotel.pincode}
            hotelRegion={hotel.region}
            hotelAmenities={hotel.amenities}
            hotelImgSrc={hotel.hotelImages[0] || defaultImg}
            hotelVisibility={hotel.hotelVisibility}
            changeVisibility={this.props.changeVisibility}
            toggleVisibility={this.props.toggleVisibility}
            edit={this.props.edit}
            delete={this.props.delete}
            showCommission={this.props.showCommission}
            showBookingsHotel={this.props.showBookingsHotel}
            showAnalysisHotel={this.props.showAnalysisHotel}
            showCommission={this.props.showCommission}
            showHotelServices={this.props.showHotelServices}
          />
        </div>
      );
    });
  }
}

export default HotelCardsList;
