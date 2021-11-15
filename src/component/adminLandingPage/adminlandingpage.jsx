import { Fragment, Component } from "react";
import axios from "axios";
import Adminheader from "../adminheaderfooter/Adminheader";
import ReportSearchBar from "../reportSearch/ReportSearchBar";
import HotelCard from "../hotelcard/hotelcard";
import logger from "../../logger";
import "../../css/userlandingpage/userlandingpage.css";

class AdminLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchState: {
        fromDate: "",
        toDate: "",
        fromRating: 0,
        endRating: 5,
        infrastructure: "",
      },
      results: [],
    };
  }

  setData = (event) => {
    let searchStateCopy = JSON.parse(JSON.stringify(this.state.searchState));
    searchStateCopy[event.target.name] = event.target.value;
    this.setState({ searchState: searchStateCopy });
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
        pathname: "/report/view",
        state: {
          searchState: this.state.searchState,
        },
      });
    }
  };

  // GET request to get 4 top rated hotels
  getTopRatedHotels = () => {
    let topRatedHotelsUrl = "";
    axios
      .get(topRatedHotelsUrl)
      .then((response) => {
        let results = response.data;
        this.setState({ results: results });
      })
      .catch((error) => {
        //            console.error(error);
      });
  };

  // Redirect to hotel details page of card being clicked
  cardClick = (event) => {
    event.preventDefault();
    let hotel_id = event.currentTarget.attributes.hotelid.value;
    let hotelDetails = this.state.results.filter((hotel) => {
      return hotel.hotel_id === hotel_id;
    })[0];
    this.props.history.push({
      pathname: "/hoteldetail/" + event.currentTarget.attributes.hotelid.value,
      state: {
        hotelDetails: hotelDetails,
      },
    });
  };

  componentDidMount() {
    // this.getTopRatedHotels();
  }

  render() {
    return (
      <Fragment>
        <Adminheader />

        <ReportSearchBar
          searchState={this.state.searchState}
          setData={this.setData}
          search={this.search}
        />
        <div className="landingPage">
          <div className="topRatedHotels">
            <div className="topRatedHotelsHeader">Top Rated Hotels</div>
            <div className="landingCardList">
              {this.state.results.map((hotel) => {
                return (
                  <div
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
                      hotelAmenities={hotel.amenities.split("//.")}
                      hotelImgSrc={
                        "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"
                      }
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

export default AdminLandingPage;
