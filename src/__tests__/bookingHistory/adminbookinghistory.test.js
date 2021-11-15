import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
import BookingHistory from '../../component/bookingHistory/BookingHistory';
import axios from "axios";
import Adminbookinghistory from "../../component/bookingHistory/adminbookinghistory";
configure({
  adapter: new Adapter(),
});

const bookings = [
  {
      hotelId : "1",
      hotelName : "Paradise Island Resort",
      city : "8/32,Wea,Opposite MCD Lift Parking, Behind Jivitesh Hotel",
      roomType: "normal",
      paymentMode : "cash",
      paymentDate : "15 aug 2021",
      amount : "4000"
  },
  {
      hotelId : "2",
      hotelName : "Island Resort",
      city : "8/32,Wea,Opposite MCD Lift Parking, Behind Jivitesh Hotel",
      roomType: "normal",
      paymentMode : "upi",
      paymentDate : "18 aug 2021",
      amount : "3000"
  }
];

const props = {
  location: {
    state: {
      hotelid: 1
    }
  }
}

let wrapper;
beforeEach(() => {
 axios.get = jest.fn().mockResolvedValue({data:bookings});
  wrapper = shallow(<Adminbookinghistory {...props}/>);
});

describe("Testing Admin Booking History Component", function () {
    it("Testing whether the object is created or not", function () {
        let obj = wrapper.instance();
    });
    it("Testing whether the object is created or not", function () {
      let obj = wrapper.instance();
      obj.pastbooking();
      obj.currentbooking();
      obj.futurebooking();
  });
  
}); 