import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import Hotel from "../../component/reviewDetails/Hotel";

configure({
  adapter: new Adapter(),
});

let wrapper;
// beforeEach(() => {
// });

let hotel = {
  state: {
    hotel_id: 0,
    hotelName: "",
    city: "city",
    review: 3,
    hotelDetails: {
      hotelImages: [],
    },
  },
};

describe("Testing Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    wrapper = shallow(<Hotel location={hotel} />);
    let obj = wrapper.instance();
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
