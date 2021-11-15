import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
import BookingHistory from '../../component/bookingHistory/BookingHistory';
import axios from "axios";
configure({
  adapter: new Adapter(),
});

const props = {
  results: [{
    
  }],
  history: {},
  role: 'user',
  hotelid: 1,
}

let wrapper;
beforeEach(() => {
  wrapper = shallow(<BookingHistory {...props}/>);
});

describe("Testing Booking History Component", function () {
  it("Testing whether the object is created or not", function () {
    let obj = wrapper.instance();
  });

}); 
