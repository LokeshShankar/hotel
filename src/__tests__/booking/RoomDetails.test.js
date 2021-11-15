import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import RoomDetails from "../../component/booking/RoomDetails";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<RoomDetails {...prop} />);
});

describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    let obj = wrapper.instance();
  });
});

let prop = {
  roomInclusions: ["WIFI", "Dinner"],
};
