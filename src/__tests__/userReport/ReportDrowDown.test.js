import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
import ReportDropDown from "../../component/userReport/ReportDropDown";
configure({
  adapter: new Adapter(),
});

let wrapper;

describe("Testing user report components", function () {
  it("Testing whether the object is created or not", function () {
    try {
        wrapper = shallow(<ReportDropDown/>);
        let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
});
