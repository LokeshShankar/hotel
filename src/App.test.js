import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import App from "./App";

configure({
  adapter: new Adapter(),
});

let wrapper;

describe("Testing Add Hotel Component", function () {

  it("Testing whether the component mounts or not", function () {
    wrapper = shallow(<App />);
  });
  it("Testing whether the object is created or not", function () {
    wrapper.instance();
  });
  it("Testing whether toggle is working", function () {
    let obj = wrapper.instance();
    const expected = !obj.state.navbarHidden;
    obj.toggle();
    const recieved = obj.state.navbarHidden;
    expect(recieved).toEqual(expected);
  });

});
