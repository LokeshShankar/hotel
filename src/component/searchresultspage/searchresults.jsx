import { Fragment, Component } from "react";
import axios from "axios";
import SearchBar from "../search/SearchBar";
import "../../css/searchresultspage/searchresults.css";
import "../../css/searchresultspage/resultcard.css";
import Pagination from "../paginationandreport/Pagination";
import ResultCardList from "./resultcardlist";
import Checkbox from "./checkbox";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import logger from "../../logger";
import {
  AMENITIES,
  ROOMTYPES,
  SEARCH_SERVICE_BASE_URL,
} from "../utility/Constant";

class SearchResultsPage extends Component {
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
      filteredResults: [],
      minPrice: "",
      maxPrice: "",
      hotelRatings: [
        {
          rating: 4.5,
          selected: false,
        },
        {
          rating: 4,
          selected: false,
        },
        {
          rating: 3.5,
          selected: false,
        },
        {
          rating: 3,
          selected: false,
        },
        {
          rating: 2.5,
          selected: false,
        },
      ],
      hotelAmenities: [],
      roomTypes: [],
      selectedFilters: {
        minPrice: 0,
        maxPrice: 1000000,
        hotelRating: 0,
        hotelAmenities: [],
        roomTypes: [],
      },
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
      var tomorrow = new Date(searchStateCopy.startDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      searchStateCopy[event.target.name] = tomorrow.toISOString().substr(0, 10);
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
      alert("Please fill in all search inputs");
    else this.getSearchResults();
  };

  // GET request to receive results based on search bar filters
  getSearchResults = () => {
    let searchUrl = SEARCH_SERVICE_BASE_URL + "/hotel/search";
    let searchParams = {
      location: this.state.searchState.location,
      checkin: this.state.searchState.startDate,
      checkout: this.state.searchState.endDate,
      adults: this.state.searchState.adults,
      children: this.state.searchState.children,
      rooms: this.state.searchState.rooms,
    };
    //    console.log(this.state.searchState.location);
    axios
      .get(searchUrl, { params: searchParams })
      .then((response) => {
        let results = response.data;
        results = results.map((result) => {
          return {
            ...result,
            amenities: result.amenities.split(","),
          };
        });
        //        console.log(results);
        this.setState({ results: results }, () => {
          this.filterResults();
        });
      })
      .catch((error) => {
        //        console.log(error);
      });
    // this.filterResults();
  };

  // filter results based on selectedFilters
  filterResults = () => {
    //    console.log(this.state.selectedFilters);
    let filteredResults = JSON.parse(JSON.stringify(this.state.results));
    let selectedFilters = this.state.selectedFilters;

    filteredResults = filteredResults.filter((hotel) => {
      let flag = true;
      // Check hotel rating >= selected rating
      if (hotel.rating < selectedFilters.hotelRating) return false;

      // If any selected amenity is not in hotel amenities, return false
      selectedFilters.hotelAmenities.forEach((selectedAmenity) => {
        if (hotel.amenities.includes(selectedAmenity) === false) flag = false;
      });
      if (flag === false) return false;

      // Filter room type and price
      let availableRooms = -1;
      hotel.rooms.forEach((roomType) => {
        if (selectedFilters.roomTypes.length > 0) {
          if (
            selectedFilters.roomTypes.includes(roomType.roomTypeName) &&
            roomType.roomPrice >= selectedFilters.minPrice &&
            roomType.roomPrice <= selectedFilters.maxPrice
          )
            availableRooms += roomType.totalRoomCount;
        } else {
          if (
            roomType.roomPrice >= selectedFilters.minPrice &&
            roomType.roomPrice <= selectedFilters.maxPrice
          )
            availableRooms += roomType.totalRoomCount;
        }
      });
      if (availableRooms < this.state.searchState.rooms) return false;

      return true;
    });
    this.setState({ filteredResults: filteredResults });
  };

  // handles change in price input
  priceChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  // handles click of go button in price filter
  filterPriceRange = (event) => {
    event.preventDefault();
    let min = parseInt(this.state.minPrice);
    let max = parseInt(this.state.maxPrice);
    if (isNaN(min) || min < 0) min = 0;
    if (isNaN(max) || max < 0) max = 1000000;
    if (min >= max) max = 1000000;
    this.setState(
      (prevState) => ({
        ...prevState,
        selectedFilters: {
          ...prevState.selectedFilters,
          minPrice: min,
          maxPrice: max,
        },
      }),
      () => {
        this.filterResults();
      }
    );
  };

  // handles click of rating checkbox
  ratingFilterClick = (event) => {
    if (event.target.nodeName === "INPUT") {
      //      console.log(event);
      let checkboxList = event.target.parentElement.parentElement.children;
      for (let i = 0; i < checkboxList.length; ++i) {
        if (checkboxList[i].children[0].name !== event.target.name)
          checkboxList[i].children[0].checked = false;
      }

      let selectedHotelRating = parseFloat(
        event.target.parentElement.innerText
      );
      this.setState(
        (prevState) => ({
          ...prevState,
          selectedFilters: {
            ...prevState.selectedFilters,
            hotelRating:
              prevState.selectedFilters.hotelRating === selectedHotelRating
                ? 0
                : selectedHotelRating,
          },
        }),
        () => {
          this.filterResults();
        }
      );
    }
  };

  // handles click of room type checkbox
  roomTypesFilterClick = (event) => {
    if (event.target.nodeName === "INPUT") {
      let selectedRoomType = event.target.parentElement.innerText;
      let updatedRoomTypes = JSON.parse(
        JSON.stringify(this.state.selectedFilters.roomTypes)
      );

      if (updatedRoomTypes.includes(selectedRoomType)) {
        updatedRoomTypes = updatedRoomTypes.filter((roomType) => {
          return roomType !== selectedRoomType;
        });
      } else updatedRoomTypes.push(selectedRoomType);

      this.setState(
        (prevState) => ({
          ...prevState,
          selectedFilters: {
            ...prevState.selectedFilters,
            roomTypes: updatedRoomTypes,
          },
        }),
        () => {
          this.filterResults();
        }
      );
    }
  };

  // handles click of hotel amenity checkbox
  hotelAmenitiesFilterClick = (event) => {
    if (event.target.nodeName === "INPUT") {
      let selectedAmenity =
        event.target.parentElement.attributes.filterItemId.value;
      // let selectedAmenity = event.target.parentElement.innerText;
      let updatedHotelAmenities = JSON.parse(
        JSON.stringify(this.state.selectedFilters.hotelAmenities)
      );

      if (updatedHotelAmenities.includes(selectedAmenity)) {
        updatedHotelAmenities = updatedHotelAmenities.filter((amenity) => {
          return amenity !== selectedAmenity;
        });
      } else updatedHotelAmenities.push(selectedAmenity);

      this.setState(
        (prevState) => ({
          ...prevState,
          selectedFilters: {
            ...prevState.selectedFilters,
            hotelAmenities: updatedHotelAmenities,
          },
        }),
        () => {
          this.filterResults();
        }
      );
    }
  };

  // Redirect to hotel details page of card being clicked
  cardClick = (event) => {
    event.preventDefault();
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
    // let results=[{hotel_id:"h001",hotelName:"Hotel 1",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"General",roomCapacity:2,totalRoomCount:15,roomPrice:100,inclusions:[1,2]},{roomTypeName:"Deluxe",roomCapacity:2,totalRoomCount:5,roomPrice:5e3,inclusions:[1,2]}],amenities:[2,4],rating:3.5,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h002",hotelName:"Hotel 2",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"General",roomCapacity:2,totalRoomCount:10,roomPrice:100,inclusions:[1,2]},{roomTypeName:"Super Deluxe",roomCapacity:2,totalRoomCount:5,roomPrice:5e3,inclusions:[1,2]}],amenities:[2,4],rating:1.5,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h003",hotelName:"Hotel 3",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"Deluxe",roomCapacity:2,totalRoomCount:5,roomPrice:1e3,inclusions:[1,2]},{roomTypeName:"Super Deluxe",roomCapacity:2,totalRoomCount:2,roomPrice:5e3,inclusions:[1,2]}],amenities:[2,4],rating:4.5,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h004",hotelName:"Hotel 4",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"General",roomCapacity:2,totalRoomCount:10,roomPrice:200,inclusions:[1,2]}],amenities:[2,4],rating:2.5,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h005",hotelName:"Hotel 5",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"Deluxe",roomCapacity:2,totalRoomCount:5,roomPrice:3e3,inclusions:[1,2]}],amenities:[2,4],rating:3.2,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h006",hotelName:"Hotel 6",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"General",roomCapacity:2,totalRoomCount:5,roomPrice:200,inclusions:[1,2]},{roomTypeName:"Super Deluxe",roomCapacity:2,totalRoomCount:2,roomPrice:5e3,inclusions:[1,2]}],amenities:[2,4],rating:2.2,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h007",hotelName:"Hotel 7",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"General",roomCapacity:2,totalRoomCount:5,roomPrice:100,inclusions:[1,2]},{roomTypeName:"Deluxe",roomCapacity:2,totalRoomCount:3,roomPrice:600,inclusions:[1,2]}],amenities:[2,4],rating:4.2,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h008",hotelName:"Hotel 8",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"General",roomCapacity:2,totalRoomCount:10,roomPrice:200,inclusions:[1,2]}],amenities:[2,4],rating:3.8,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h009",hotelName:"Hotel 9",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"Deluxe",roomCapacity:2,totalRoomCount:10,roomPrice:700,inclusions:[1,2]}],amenities:[2,4],rating:4.8,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h010",hotelName:"Hotel 10",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"General",roomCapacity:2,totalRoomCount:15,roomPrice:50,inclusions:[1,2]}],amenities:[2,4],rating:2.2,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h011",hotelName:"Hotel 11",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"General",roomCapacity:2,totalRoomCount:5,roomPrice:100,inclusions:[1,2]},{roomTypeName:"Super Deluxe",roomCapacity:2,totalRoomCount:5,roomPrice:8e3,inclusions:[1,2]}],amenities:[2,4],rating:1.5,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h012",hotelName:"Hotel 12",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"Deluxe",roomCapacity:2,totalRoomCount:10,roomPrice:500,inclusions:[1,2]},{roomTypeName:"Super Deluxe",roomCapacity:2,totalRoomCount:5,roomPrice:5e3,inclusions:[1,2]}],amenities:[4],rating:.5,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"},{hotel_id:"h013",hotelName:"Hotel 13",phone:"ph1",email:"e1",checkInTime:"2022-02-23",checkOutTime:"2022-02-25",taxRate:3,localAddress:"la1",region:"Karnataka",importantLandmarks:["il1","il2"],city:"Bangalore",pincode:123456,coordinates:null,rooms:[{roomTypeName:"General",roomCapacity:2,totalRoomCount:15,roomPrice:80,inclusions:[1,2]}],amenities:[2,4,5],rating:4.5,hotelImgSrc:"https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif"}];

    this.setState({
      hotelAmenities: AMENITIES.map((amenity, index) => {
        return {
          name: amenity.key,
          id: index + 1,
        };
      }),
      roomTypes: ROOMTYPES.map((roomtype, index) => {
        return {
          name: roomtype.label,
          id: index + 1,
        };
      }),
    });
    // this.setState({results: results},() => {this.filterResults()});

    let locationState = this.props.location.state;
    if (locationState) {
      this.setState({ searchState: locationState.searchState }, () => {
        this.getSearchResults();
      });
    }
  }

  render() {
    let result;
    if (this.state.filteredResults.length > 0)
      result = (
        <Pagination data={this.state.filteredResults}>
          <ResultCardList cardClick={this.cardClick} />
        </Pagination>
      );
    else result = <div className="no-result-header">No results to display</div>;
    return (
      <Fragment>
        <SearchBar
          searchState={this.state.searchState}
          setData={this.setData}
          setCheckOutDate={this.setCheckOutDate}
          setCheckInDate={this.setCheckInDate}
          setAdults={this.setAdults}
          setChildren={this.setChildren}
          setRooms={this.setRooms}
          search={this.search}
        />
        <div className="searchResultsPage">
          <div className="searchFilter">
            <div id="priceFilter" className="filter">
              <div className="filterName">Price Ranges</div>
              <div className="priceRange">
                <div className="priceInputDiv">
                  <Input
                    name="minPrice"
                    label="Min Price"
                    labelClassName="priceLabel"
                    placeholder="Min"
                    className="priceInput"
                    value={this.state.minPrice}
                    onChange={this.priceChange}
                  />
                </div>
                <div className="priceInputDiv">
                  <Input
                    name="maxPrice"
                    label="Max Price"
                    labelClassName="priceLabel"
                    placeholder="Max"
                    className="priceInput"
                    value={this.state.maxPrice}
                    onChange={this.priceChange}
                  />
                </div>
                <Button
                  id="priceFilterButton"
                  type="button"
                  label="GO"
                  cssClassName="go-btn"
                  handleClick={this.filterPriceRange}
                />
              </div>
            </div>
            <div id="hotelRatingsFilter" className="filter">
              <div className="filterName">Hotel Rating</div>
              <div className="checkboxList">
                {this.state.hotelRatings.map((rating, i) => {
                  return (
                    <Checkbox
                      label={rating.rating + "+"}
                      name={rating.rating}
                      filterItemId={i}
                      onClick={this.ratingFilterClick}
                      key={i}
                    />
                  );
                })}
              </div>
            </div>
            <div id="hotelAmenitiesFilter" className="filter">
              <div className="filterName">Hotel Amenities</div>
              <div className="checkboxList">
                {this.state.hotelAmenities.map((amenity, i) => {
                  return (
                    <Checkbox
                      label={amenity.name}
                      name={amenity.name}
                      filterItemId={amenity.name}
                      onClick={this.hotelAmenitiesFilterClick}
                      key={i}
                    />
                  );
                })}
              </div>
            </div>
            <div id="roomTypesFilter" className="filter">
              <div className="filterName">Room Types</div>
              <div className="checkboxList">
                {this.state.roomTypes.map((types, i) => {
                  return (
                    <Checkbox
                      label={types.name}
                      name={types.name}
                      filterItemId={types.id}
                      onClick={this.roomTypesFilterClick}
                      key={i}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="searchResultCards">{result}</div>
        </div>
      </Fragment>
    );
  }
}

export default SearchResultsPage;
