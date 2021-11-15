import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import ReviewHeader from "../../component/reviewDetails/ReviewHeader";
configure({
  adapter: new Adapter(),
});

let wrapper;

const header = {
  hotelname: "Paradise Island Resort & Spa Maldives",
  hoteladdress: "8/32,Wea,Opposite MCD Lift Parking, Behind Jivitesh Hotel",
  hotelReview: 0,
  amenities: ["Amenity"],
};
describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    wrapper = shallow(<ReviewHeader hotel={header} />);
    let obj = wrapper.instance();
  });
  it("To count numbers of stars tags on review card ", function () {
    wrapper = shallow(<ReviewHeader hotel={header} />);
    let count = wrapper.find("GetStar").length;
    expect(count).toBe(1);
  });

  it("To count numbers of tags on review details Component ", function () {
    wrapper = shallow(<ReviewHeader hotel={header} />);
    let count_div = wrapper.find("div").length;
    let count_h1 = wrapper.find("h1").length;
    expect(count_div).toBe(13);
  });
});
