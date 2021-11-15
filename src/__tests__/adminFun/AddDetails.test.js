import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import AddDetails from "../../component/addhotel/AddDetails";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<AddDetails />);
});

describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    let obj = wrapper.instance();
  });

  it("Resetting the state", function () {
    let obj = wrapper.instance();
    obj.resetState();
  });
});
