import { Component } from "react";
import HotelCard from "../hotelcard/hotelcard";
import "../../css/searchresultspage/resultcard.css";

class ResultCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  

  render() {
    // console.log(this.props.results.length)
    let defaultImg="https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";
    return (
      <div className="resultCardList">
        {this.props.results.map((hotel) => {
          return (
            <div
              className='resultCard'
              key={hotel.hotel_id}
              hotelid={hotel.hotel_id}
              onClick={this.props.cardClick}
            >
              <HotelCard
                hotelName={hotel.hotelName}
                // hotelPrice={hotel.hotelPrice}
                hotelCity={hotel.city}
                hotelPincode={hotel.pincode}
                hotelRegion={hotel.region}
                hotelAmenities={hotel.amenities}
                hotelImgSrc={hotel.hotelImages[0] || defaultImg}
                rating={hotel.rating}
                rooms={hotel.rooms}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

ResultCardList.defaultProps = {
  results: [],
};

export default ResultCardList;
