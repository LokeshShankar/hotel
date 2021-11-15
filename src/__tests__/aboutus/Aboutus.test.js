import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import AddHotel from "../../component/addhotel/AddHotel";
import axios from "axios";
import { DUMMY_STATEOBJECT } from "../../component/utility/Constant";
import Aboutus from "../../component/aboutUs/Aboutus";

configure({
  adapter: new Adapter(),
});

let wrapper;
const completed = jest.fn();
beforeEach(() => {
  wrapper = shallow(<Aboutus />);
});

describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
});
