import { Fragment, Component } from "react";
import axios from "axios";
import SearchBar from "../search/SearchBar";
import HotelCard from "../hotelcard/hotelcard";
import "../../css/userlandingpage/userlandingpage.css";
import "../../css/userlandingpage/landingcard.css";
import { SEARCH_SERVICE_BASE_URL } from "../utility/Constant";

class UserLandingPage extends Component {
  constructor(props) {
    super(props);
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.state = {
      searchState: {
        location: "",
        startDate: new Date().toISOString().substr(0, 10),
        endDate: tomorrow.toISOString().substr(0, 10),
        adults: 1,
        children: 0,
        rooms: 1,
      },
      results: [],
    };
  }

  setData = (event) => {
    let searchStateCopy = JSON.parse(JSON.stringify(this.state.searchState));
    searchStateCopy[event.target.name] = event.target.value;
    this.setState({ searchState: searchStateCopy });
  };

  setCheckInDate = (event) => {
    let searchStateCopy = JSON.parse(JSON.stringify(this.state.searchState));
    if (new Date(event.target.value) < new Date()) {
      event.target.value = new Date().toISOString().substr(0, 10);
    }
    if (new Date(searchStateCopy.endDate) <= new Date(event.target.value)) {
      var tomorrow = new Date(event.target.value);
      tomorrow.setDate(tomorrow.getDate() + 1);
      searchStateCopy.endDate = tomorrow.toISOString().substr(0, 10);
    }
    searchStateCopy[event.target.name] = event.target.value;
    this.setState({ searchState: searchStateCopy });
  };

  setCheckOutDate = (event) => {
    let searchStateCopy = JSON.parse(JSON.stringify(this.state.searchState));
    if (new Date(searchStateCopy.startDate) >= new Date(event.target.value)) {
      var tomorrow1 = new Date(searchStateCopy.startDate);
      tomorrow1.setDate(tomorrow1.getDate() + 1);
      searchStateCopy[event.target.name] = tomorrow1
        .toISOString()
        .substr(0, 10);
    } else {
      searchStateCopy[event.target.name] = event.target.value;
    }
    this.setState({ searchState: searchStateCopy });
  };

  setAdults = (event) => {
    let value = Math.max(1, Math.min(20, event.target.value));
    let searchStateCopy = JSON.parse(JSON.stringify(this.state.searchState));
    searchStateCopy[event.target.name] = value;
    this.setState({ searchState: searchStateCopy });
  };

  setChildren = (event) => {
    let value = Math.max(0, Math.min(20, event.target.value));
    let searchStateCopy = JSON.parse(JSON.stringify(this.state.searchState));
    searchStateCopy[event.target.name] = value;
    this.setState({ searchState: searchStateCopy });
  };

  setRooms = (event) => {
    if (event.target.value > this.state.searchState.adults) {
      let value = Math.max(1, Math.min(20, event.target.value));
      let searchStateCopy = JSON.parse(JSON.stringify(this.state.searchState));
      searchStateCopy[event.target.name] = value;
      searchStateCopy["adults"] = value;
      this.setState({ searchState: searchStateCopy });
    } else {
      let value = Math.max(1, Math.min(20, event.target.value));
      let searchStateCopy = JSON.parse(JSON.stringify(this.state.searchState));
      searchStateCopy[event.target.name] = value;
      this.setState({ searchState: searchStateCopy });
    }
  };

  // handles click of search button
  search = (event) => {
    event.preventDefault();
    if (
      this.state.searchState.location === "" ||
      this.state.searchState.startDate === "" ||
      this.state.searchState.endDate === ""
    )
      window.alert("Please fill in all search inputs");
    else {
      this.props.history.push({
        pathname: "/search",
        state: {
          searchState: this.state.searchState,
        },
      });
    }
  };

  // GET request to get 4 top rated hotels
  getTopRatedHotels = () => {
    let topRatedHotelsUrl = SEARCH_SERVICE_BASE_URL + "/hotel/toprating/4";
    axios
      .get(topRatedHotelsUrl)
      .then((response) => {
        let results = response.data;
        results = results.map((result) => {
          return {
            ...result,
            amenities: result.amenities.split(","),
          };
        });
        //        console.log(results);
        this.setState({ results: results });
      })
      .catch((error) => {
        //        console.log(error);
      });
  };

  // Redirect to hotel details page of card being clicked
  cardClick = (event) => {
    event.preventDefault();
    if (
      this.state.searchState.startDate === "" ||
      this.state.searchState.endDate === ""
    ) {
      alert("Please first fill in checkin and checkout in Search bar");
      return;
    }

    let hotel_id = event.currentTarget.attributes.hotelid.value;
    let hotelDetails = this.state.results.filter((hotel) => {
      return String(hotel.hotel_id) === hotel_id;
    })[0];

    this.props.history.push({
      pathname: "/hoteldetail/" + event.currentTarget.attributes.hotelid.value,
      state: {
        hotelDetails: hotelDetails,
        searchState: this.state.searchState,
      },
    });
  };

  componentDidMount() {
    this.getTopRatedHotels();
  }

  render() {
    let defaultImg =
      "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";
    return (
      <Fragment>
        <SearchBar
          searchState={this.state.searchState}
          setData={this.setData}
          setCheckInDate={this.setCheckInDate}
          setCheckOutDate={this.setCheckOutDate}
          setAdults={this.setAdults}
          setChildren={this.setChildren}
          setRooms={this.setRooms}
          search={this.search}
        />
        <div className="landingPage">
          <div className="topRatedHotels">
            <div className="topRatedHotelsHeader">Top Rated Hotels</div>
            <p className="topRatedHotelsPara">
              We have selected some best hotels around the world for you.
            </p>
            <div className="landingCardList">
              {this.state.results.map((hotel) => {
                return (
                  <div
                    className="landingCard"
                    key={hotel.hotel_id}
                    hotelid={hotel.hotel_id}
                    onClick={this.cardClick}
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
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserLandingPage;
