import { Fragment, Component } from "react";
import axios from "axios";
import "../../css/viewhotelsadmin/hotelspageadmin.css";
import Pagination from "../paginationandreport/Pagination";
import HotelCardsList from "./HotelCardsList";
import Cookies from "universal-cookie/lib";
import { HOTEL_SERVICE_BASE_URL, STATEOBJECT } from "../utility/Constant.jsx";
import { Input } from "../utility/Input";

class HotelsPageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      filteredResults: [],
      hotelidedit: 0,
      hotelideditstate: STATEOBJECT,
      response: "",
      hoteliddelete: 0,
      location: "",
      hotelName: "",
      services: [],
    };
  }

  componentDidMount() {
    this.getAdminHotels();
  }
  // GET request to receive hotels current admin has added
  getAdminHotels = () => {
    // document.cookie="jwtToken=eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyODgzNTEwNiwiZXhwIjoxNjI4ODM2MTA2fQ.ylj0X04dwspzQ_5joMqLh_Pv9_x3vlOQL2I11JaRi4U"
    // document.cookie="jwtToken=eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImUyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI4ODM1MTA2LCJleHAiOjE2Mjg4MzYxMDZ9.7N97AL0DbhfAQPOVU93QuxX5VZfVsKQDjTQZReAh4QI"
    let jwtTokenCookie = new Cookies();
    let url = HOTEL_SERVICE_BASE_URL;
    axios
      .get(url + "/user/hotels", {
        headers: {
          Authorization: jwtTokenCookie.get("jwtToken"),
        },
      })
      .then((response) => {
        let results = JSON.parse(JSON.stringify(response.data));
        this.setState({ results: results, filteredResults: results });
      })
      .catch((error) => {});
  };
  toggleVisibility = (hotel_id) => {
    let jwtTokenCookie = new Cookies();
    let url = HOTEL_SERVICE_BASE_URL;
    axios
      .get(url + "/user/hotel/updateVisibility/" + hotel_id, {
        headers: {
          Authorization: jwtTokenCookie.get("jwtToken"),
        },
      })
      .then((response) => {
        this.changeVisibility(hotel_id);
      })
      .catch((error) => {});
  };
  filerLocation = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    let filteredResults = JSON.parse(JSON.stringify(this.state.results));
    if (event.target.value.length > 0) {
      filteredResults = filteredResults.filter((hotel) => {
        if (hotel.city.length < event.target.value.length) return false;
        else if (
          hotel.city.toLowerCase().substring(0, event.target.value.length) ===
          event.target.value.toLowerCase()
        )
          return true;
      });
    }
    this.setState({ filteredResults: filteredResults });
  };
  filerHotelName = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    let filteredResults = JSON.parse(JSON.stringify(this.state.results));
    if (event.target.value.length > 0) {
      filteredResults = filteredResults.filter((hotel) => {
        if (hotel.hotelName.length < event.target.value.length) return false;
        else if (
          hotel.hotelName
            .toLowerCase()
            .substring(0, event.target.value.length) ===
          event.target.value.toLowerCase()
        )
          return true;
      });
    }
    this.setState({ filteredResults: filteredResults });
  };
  changeVisibility = (hotel_id) => {
    let updatedHotelResults = JSON.parse(JSON.stringify(this.state.results));
    updatedHotelResults = updatedHotelResults.map((hotel) => {
      if (hotel.hotelId === hotel_id)
        hotel.hotelVisibility = !hotel.hotelVisibility;
      return hotel;
    });
    this.setState({
      results: updatedHotelResults,
      filteredResults: updatedHotelResults,
    });
  };

  editHotel = (id) => {
    this.props.history.push({
      pathname: "/admin/editHotel",
      state: {
        hid: id,
      },
    });
  };
  deleteHotel = (id) => {
    this.props.history.push({
      pathname: "/admin/deleteHotel",
      state: {
        hid: id,
      },
    });
  };

  showCommission = (id) => {
    this.props.history.push({
      pathname: "/admin/commission",
      state: {
        hotelId: id,
      },
    });
  };

  showBookingsHotel = (id) => {
    this.props.history.push({
      pathname: "/admin/bookings",
      state: {
        hotelid: id,
      },
    });
  };

  showAnalysisHotel = (id) => {
    this.props.history.push({
      pathname: "/admin/analysis/" + id,
    });
  };
  // adding hotel bill service axios by Lokesh
  showHotelServices = (id) => {
    // console.log(id);
    //    console.log(this.props.history);

    this.props.history.push({
      pathname: "/admin/hotelbillservices",
      state: {
        hotelid: id,
      },
    });
  };
  // showHotelServices = (hotel_id) => {
  //   let jwtTokenCookie = new Cookies();
  //   let url = HOTEL_SERVICE_BASE_URL;
  //   axios
  //     .get(url+'/hotel/' + hotel_id +'/services?available=true', {
  //       headers: {
  //         Authorization: jwtTokenCookie.get("jwtToken"),
  //       },
  //     })
  //     .then((response) => {
  //       // this.changeVisibility(hotel_id);
  //       this.setState({services:response.data});
  //     })
  //     .catch((error) => {});
  // };

  render() {
    // console.log(this.state.filteredResults);
    let result;
    if (this.state.results.length > 0)
      result = (
        <Pagination data={this.state.filteredResults}>
          <HotelCardsList
            results={this.state.filteredResults}
            toggleVisibility={this.toggleVisibility}
            edit={this.editHotel}
            delete={this.deleteHotel}
            showCommission={this.showCommission}
            showBookingsHotel={this.showBookingsHotel}
            showAnalysisHotel={this.showAnalysisHotel}
            showHotelServices={this.showHotelServices} //Lokesh
          />
        </Pagination>
      );
    else result = <div className="no-result-header">No results to display</div>;
    return (
      <Fragment>
        <div className="headingAdmin">My Hotels</div>
        <div className="adminhotelfilter">
          <div className="adminhotelfilterhead">Search Filters</div>
          <Input
            name="hotelName"
            type="text"
            value={this.state.hotelName}
            onChange={this.filerHotelName}
            className="--form-publicis-input"
            placeholder="Hotel Name"
          />
          <Input
            name="location"
            type="text"
            value={this.state.location}
            onChange={this.filerLocation}
            className="--form-publicis-input"
            placeholder="City"
          />
        </div>
        <div className="hotelAdminPage">{result}</div>
      </Fragment>
    );
  }
}

export default HotelsPageAdmin;
