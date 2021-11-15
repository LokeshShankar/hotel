import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
import RoomDetails from '../../component/reviewDetails/RoomDetails';
configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<RoomDetails />);
});

describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of tags on review details Component", function () {
    try {
      let count_div = wrapper.find("div").length;
      expect(count_div).toBe(1);
      
     
    } catch (error) {
      fail();
    }
  });
});
