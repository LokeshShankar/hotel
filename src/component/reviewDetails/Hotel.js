import React, { useRef } from "react";
import ReviewHeader from "./ReviewHeader";
import Slideshow from "./Slideshow";
import ReviewDetails from "./ReviewDetails";
import RoomDetails from "./RoomDetails";

import "../../css/reviewDetails/Hotel.css";

// import { useCookies } from 'react-cookie';
// import { useHistory } from 'react-router-dom'
import {
  Link,
  Redirect,
  Route,
  BrowserRouter,
  Switch,
  useHistory,
} from "react-router-dom";
import MyParentComponentWrapper from "../map/map2";
//     const [cookies, setCookie, removeCookie] = useCookies('access_token');
//     setCookie('access_token', 'mytoken', { path: '/'});
//     const idleTimerRef = useRef(null);
//     const onIdle = () => {
//       removeCookie('access_token');
//   }

function Hotel(props) {
  let locationState = props.location.state;
  //  console.log(props);

  // let locationState = {
  //   hotel: {
  //     hotel_id: 21,
  //     hotelName: "H2 Hotel",
  //     phone: "1111111111",
  //     email: "h1@hotel.com",
  //     checkInTime: "06:30",
  //     checkOutTime: "22:30",
  //     taxRate: 10.0,
  //     hotelAdminId: 2,
  //     hotelVisibility: true,
  //     createdOn: "2021-08-19",
  //     rating: 0.0,
  //     localAddress: "NCR",
  //     region: "NCR",
  //     importantLandmarks: "landmark",
  //     city: "Delhi",
  //     pincode: "111111",
  //     latitude: 0.0,
  //     longitude: 0.0,
  //     rooms: [
  //       {
  //         roomTypeName: "Semi Deluxe",
  //         roomCapacity: 5,
  //         totalRoomCount: 10,
  //         roomPrice: 3000,
  //         inclusions: "Free Wifi,Free Breakfast,Breakfast Buffet",
  //       },
  //       {
  //         roomTypeName: "Deluxe",
  //         roomCapacity: 5,
  //         totalRoomCount: 10,
  //         roomPrice: 3000,
  //         inclusions: "Free Wifi,Free Breakfast,Breakfast Buffet",
  //       },
  //     ],
  //     amenities: "First-aid Services,Room Service",
  //   },
  //   searchState: {
  //     location: "Delhi",
  //     startDate: "2021-08-17",
  //     endDate: "2021-09-01",
  //     adults: 1,
  //     children: 0,
  //     rooms: 1,
  //   },
  // };

  // const history = useHistory();

  // const idleTimerRef = useRef(null);
  // const [cookies, setCookie, removeCookie] = useCookies("access_token");
  // const onIdle = () => {
  //     removeCookie("jwtToken");
  //     setTimeout(() => {
  //         alert("session time out")
  //      }, 1000)
  //   history.push({pathname : "/signin", message : "session time out"});
  // };

  // console.log(hotel);

  return (
    <>
      <div class="reviewDetails_hotelDetails_container">
        <Slideshow images={locationState.hotelDetails.hotelImages} />
        <ReviewHeader hotel={locationState.hotelDetails} />
      </div>
      <RoomDetails
        hotel={locationState.hotelDetails}
        history={props.history}
        searchState={locationState.searchState}
      />

      {/* <div className="hotel-google-map">
        <Maps
          markers={{
            name: "Current position",
            position: {
              lat: locationState.hotelDetails.latitude,
              lng: locationState.hotelDetails.longitude,
            },
          }}
        />
      </div> */}
      <div className="hotel-google-map">
        <MyParentComponentWrapper
          position={{
            lat: locationState.hotelDetails.latitude,
            lng: locationState.hotelDetails.longitude,
          }}
        ></MyParentComponentWrapper>
      </div>

      <ReviewDetails hotelid={locationState.hotelDetails.hotel_id} />
    </>
  );
}

export default Hotel;
