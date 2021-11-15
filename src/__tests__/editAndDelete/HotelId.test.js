import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import HotelId from "../../component/editanddeletehotel/HotelId";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<HotelId {...prop} />);
});

describe("Testing Hotel Address Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("To check hotel  Id", function () {
    let object = wrapper.find("Button").at(0);
    mockInfo(wrapper.find("Input"));
    object.props().handleClick({ preventDefault: () => {} });

    let obj = wrapper.instance();
    expect(obj.state.hotelId).toBe("-2");
  });

  it("Valid hotel  Id", function () {
    let object = wrapper.find("Button").at(0);
    wrapper.find("Input").simulate("change", {
      preventDefault: () => {},
      target: { name: "hotelId", value: "22" },
    });
    object.props().handleClick({ preventDefault: () => {} });

    let obj = wrapper.instance();
    expect(obj.state.hotelId).toBe("22");
  });
});

const mockfunc = jest.fn();

const prop = {
  func: mockfunc,
};

const fillData = (object, tagName, tagValue) => {
  object.simulate("change", {
    preventDefault: () => {},
    target: { name: tagName, value: tagValue },
  });
};

function mockInfo(inputTags) {
  fillData(inputTags.at(0), "hotelId", "-2");
}
