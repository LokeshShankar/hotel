import axios from "axios";
import React from "react";
import {
  HOTEL_SERVICE_BASE_URL,
  HOTEL_SERVICE_URL,
  STATEOBJECT,
} from "../utility/Constant.jsx";
import AddHotel from "../addhotel/AddHotel";
import Cookies from "universal-cookie/lib";

class EditHotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: STATEOBJECT,
      hid: props.location.state.hid,
      flag: 0,
      err: "",
    };
  }
  completed = () => {
    this.props.history.push({
      pathname: "/admin",
    });
  };
  componentDidMount() {
    // console.log(this.state.hotel);
    this.edit(this.state.hid);
  }

  convertArrayToJson = (data) => {
    let arr = data.split(",");
    let resultArr = [];
    for (const x of arr) {
      resultArr.push({ key: x });
    }
    return resultArr;
  };

  convertArrayToRoomList = (arr) => {
    let resultArr = [];
    for (const x of arr) {
      resultArr.push({
        roomtype: x.roomTypeName,
        maxallowed: x.roomCapacity.toString(),
        roomcount: x.totalRoomCount.toString(),
        price: x.roomPrice.toString(),
        selectedInclusions: this.convertArrayToJson(x.inclusions),
      });
    }
    return resultArr;
  };

  fillHotelDetails = (data) => {
    //    console.log(data);
    this.setState({
      hotel: {
        hid: data.hotelId,
        hname: data.hotelName,
        hphone: data.phone,
        hemail: data.email,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        htax: data.taxRate.toString(),
        localAddress: data.localAddress,
        city: data.city,
        pincode: data.pincode,
        region: data.region,
        landmarks: data.importantLandmarks,
        selectedAmenities: this.convertArrayToJson(data.amenities),
        roomList: this.convertArrayToRoomList(data.rooms),
        addressFlag: 1,
        hotelImages: data.hotelImages,
      },
      flag: 1,
    });

    //    console.log(this.state.hotel);
  };

  edit = (id) => {
    // this.state.hotel.hid = id;
    let jwtTokenCookie = new Cookies(); ////Creating Cookie object

    axios
      .get(HOTEL_SERVICE_BASE_URL + "/hotel/id/" + id, {
        headers: {
          Authorization: jwtTokenCookie.get("jwtToken"),
        },
      })
      .then((res) => {
        if (res.data === "") {
          alert("ID doesn't exist");
          this.setState({ err: "ID doesn't exist" });
        } else {
          //          console.log(res.data);
          this.fillHotelDetails(res.data);
        }
      })
      .catch((error) => {
        alert(error);
        this.setState({ err: error });
      });
  };
  render() {
    if (this.state.flag === 1) {
      return <AddHotel {...this.state.hotel} completed={this.completed} />;
    } else {
      return <div></div>;
    }
  }
}

export default EditHotel;
