import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import RoomTypeDetailCard from "../../component/roomavailability/RoomTypeDetailCard";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<RoomTypeDetailCard {...roomDetailsProp} />);
});

describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    let obj = wrapper.instance();
  });

  it("Mock Room SelectCallBack ", () => {
    let obj = wrapper.instance();
    let event = {
      target: { value: "Hello" },
    };
    obj.onTrigger(event);
    expect(mockSelectCallBack).toHaveBeenCalledWith("Hello");
  });
});

const mockSelectCallBack = jest.fn();

let roomDetailsProp = {
  roomDetails: {
    roomType: "Deluxe",
    maxPersons: 3,
    roomCount: 2,
    roomPrice: 5000,
    roomInclusions: ["Free Wifi", "Free Breakfast"],
  },
  selectCallBack: mockSelectCallBack,
};
