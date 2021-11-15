import "../../css/adminFun/admincomponent.css";
import React from "react";
import NewRoom from "./AddRoom";
import "../../css/utility/button.css";
import HotelDetails from "./HotelDetails";
import HotelAddress from "./HotelAddress";
import axios from "axios";
import AddDetails from "./AddDetails";
import Cookies from "universal-cookie/lib";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant.jsx";
import HotelsPageAdmin from "../viewhotelsadmin/HotelsPageAdmin";

class AddHotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hid: props.hid,
      addressFlag: 0,
      hname: props.hname,
      hphone: props.hphone,
      hemail: props.hemail,
      htax: props.htax,
      checkInTime: props.checkInTime,
      checkOutTime: props.checkOutTime,
      localAddress: props.localAddress,
      city: props.city,
      region: props.region,
      pincode: props.pincode,
      latitude: props.latitude,
      longitude: props.longitude,
      landmarks: props.landmarks,
      selectedAmenities: props.selectedAmenities,
      errors: {},
      roomList: props.roomList,
      hotelImages: props.hotelImages,
      response: "",
      err: "",
      flagForEditHotel: 0,
    };
  }

  addHotel = () => {
    this.setState({
      addressFlag: 0,
    });
  };

  handleRoomCallback = (childData) => {
    this.state.roomList = childData;
    this.sendDatatoService();
  };

  convertArraytoString = (array) => {
    let resultString = "";
    if (array.length !== 0) {
      resultString = resultString + array[0].key;
      for (let i = 1; i < array.length; ++i) {
        resultString = resultString + "," + array[i].key;
      }
    }
    return resultString;
  };

  convertRoomtoObject = () => {
    let result = [];
    for (let x of this.state.roomList) {
      let obj = {
        roomTypeName: x.roomtype,
        roomCapacity: parseInt(x.maxallowed),
        totalRoomCount: parseInt(x.roomcount),
        roomPrice: parseInt(x.price),
        inclusions: this.convertArraytoString(x.selectedInclusions),
      };
      result.push(obj);
    }
    return result;
  };

  sendDatatoService = async () => {
    let object = {
      hotelName: this.state.hname,
      phone: this.state.hphone,
      email: this.state.hemail,
      checkInTime: this.state.checkInTime,
      checkOutTime: this.state.checkOutTime,
      taxRate: parseFloat(this.state.htax),
      localAddress: this.state.localAddress,
      region: this.state.region,
      importantLandmarks: this.state.landmarks,
      city: this.state.city,
      pincode: this.state.pincode,
      coordinates: null,
      rooms: this.convertRoomtoObject(),
      hotelImages: this.state.hotelImages,
      amenities: this.convertArraytoString(this.state.selectedAmenities),
      hotelVisibility: true,
      createdOn: new Date(),
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    // console.log(this.state);
    // console.log(object);
    let jwtTokenCookie = new Cookies(); ////Creating Cookie object

    if (this.state.hid === "") {
      await axios
        .post(HOTEL_SERVICE_BASE_URL + "/user/hotel/add", object, {
          headers: {
            Authorization: jwtTokenCookie.get("jwtToken"),
            // Authorization:
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaXRyYW11c3RhZmk1NkBnbWFpbC5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.BsFbgiVp5R-xMmwB78et_nCf821wnel-bkltXAE7Q-k",
          },
        })
        .then((res) => {
          alert(res.data);
          this.storeResponse(res.data);
          this.setState({ flagForEditHotel: 2 });
          this.props.resetState();
          this.props.completed();
        })
        .catch((error) => {
          this.setState({ err: error });
          //          console.log("Error", error);
        });
    } else {
      await axios
        .put(
          HOTEL_SERVICE_BASE_URL + "/user/hotel/update/" + this.state.hid,
          object,
          {
            headers: {
              Authorization: jwtTokenCookie.get("jwtToken"),
            },
          }
        )
        .then((res) => {
          alert(res.data);
          // this.storeResponse(res.data);
          // this.setState({ flagForEditHotel: 1 });
          this.props.completed();
        })
        .catch((error) => {
          this.setState({ err: error });
        });
    }
  };

  storeResponse = (res) => {
    this.setState({ response: res });
  };

  handleHotelDetailsCallback = (childData) => {
    this.state.hname = childData.hname;
    this.state.hphone = childData.hphone;
    this.state.hemail = childData.hemail;
    this.state.htax = childData.htax;
    this.state.checkInTime = childData.checkInTime;
    this.state.checkOutTime = childData.checkOutTime;
    this.state.hotelImages = childData.hotelImages;
    this.setState({ addressFlag: 1 });
    // console.log(this.state);
  };

  handleHotelAddressCallback = (childData) => {
    this.state.localAddress = childData.localAddress;
    this.state.city = childData.city;
    this.state.region = childData.region;
    this.state.pincode = childData.pincode;
    this.state.latitude = childData.latitude;
    this.state.longitude = childData.longitude;
    this.state.selectedAmenities = childData.selectedAmenities;
    this.state.landmarks = childData.landmarks;
    this.setState({ addressFlag: 2 });
    // console.log(this.state);
  };

  render() {
    if (this.state.flagForEditHotel === 2) {
      return <AddDetails />;
    }

    if (this.state.addressFlag === 0) {
      return (
        <div>
          <HotelDetails
            hname={this.state.hname}
            hphone={this.state.hphone}
            hemail={this.state.hemail}
            htax={this.state.htax}
            checkInTime={this.state.checkInTime}
            checkOutTime={this.state.checkOutTime}
            hotelImages={this.state.hotelImages}
            hotelDetailsCallback={this.handleHotelDetailsCallback}
          ></HotelDetails>
        </div>
      );
    } else if (this.state.addressFlag === 1) {
      return (
        <HotelAddress
          fun={this.addHotel}
          localAddress={this.state.localAddress}
          city={this.state.city}
          region={this.state.region}
          pincode={this.state.pincode}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          landmarks={this.state.landmarks}
          selectedAmenities={this.state.selectedAmenities}
          hotelAddressCallback={this.handleHotelAddressCallback}
        ></HotelAddress>
      );
    } else {
      return (
        <div>
          <NewRoom
            roomCallback={this.handleRoomCallback}
            roomList={this.state.roomList}
          />
        </div>
      );
    }
  }
}

export default AddHotel;
