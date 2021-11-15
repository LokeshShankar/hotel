import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
import AlertBox from "../../component/alertBox/AlertBox";

configure({
  adapter: new Adapter(),
});

let wrapper;
// beforeEach(() => {
// });

let hotel = {
  hotel_id: 0,
  hotelName: '',
  city: 'city',
  review: 3
};

describe("Testing Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      wrapper = shallow(<AlertBox />);
      let obj = wrapper.instance();
      // console.log(obj);
    } catch (error) {
      fail();
    }
  });

  // it("To count numbers of tags on review details Component ", function () {
  //   try {
  //     let count_div = wrapper.find("div").length;
  //     expect(count_div).toBe(1);
  //   } catch (error) {
  //     fail();
  //   }
  // });
});