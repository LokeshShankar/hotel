import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import NewRoom from "../../component/addhotel/AddRoom";
import { INCLUSIONS, ROOMTYPES } from "../../component/utility/Constant";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<NewRoom {...hotelRoom} />);
});

describe("Testing Add Room Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("Check the add button with last filled details incomplete", function () {
    try {
      let obj = wrapper.instance();

      let currentSize = obj.state.inputList.length;
      let object = wrapper.find("Button").at(2);

      object.simulate("click", {
        preventDefault: () => {},
      });
      expect(obj.state.inputList.length).toBe(currentSize);
    } catch (error) {
      fail();
    }
  });

  it("Check the add button with last filled details complete", function () {
    try {
      let obj = wrapper.instance();
      obj.state.inputList = validRoomList;
      let currentSize = obj.state.inputList.length;
      let object = wrapper.find("Button").at(2);
      object.props().handleClick({ preventDefault: () => {} });
      expect(obj.state.inputList.length).toBe(currentSize + 1);
    } catch (error) {
      fail();
    }
  });

  it("Check the remove button", function () {
    try {
      let obj = wrapper.instance();
      let currentSize = obj.state.inputList.length;
      let object = wrapper.find("Button").at(1);
      object.props().handleClick({ preventDefault: () => {} });
      expect(obj.state.inputList.length).toBe(currentSize - 1);
    } catch (error) {
      fail();
    }
  });

  it("Check the empty entries", function () {
    try {
      let obj = wrapper.instance();
      let object = wrapper.find("Button").at(3);
      object.props().handleClick({ preventDefault: () => {} });
      expect(obj.state.errors).toStrictEqual({
        roomtype: "Room type can't be empty",
        roomcount: "Room count can't be empty",
      });
    } catch (error) {
      fail();
    }
  });

  it("Check the invalid entries", function () {
    try {
      let obj = wrapper.instance();
      obj.state.inputList = invalidRoomEntry;
      let object = wrapper.find("Button").at(3);
      object.props().handleClick({ preventDefault: () => {} });
      expect(obj.state.errors).toStrictEqual({
        roomtype: "Invalid room type",
        roomcount: "Invalid room count",
        price: "Invalid price",
        maxallowed: "Invalid Max Persons",
      });
    } catch (error) {
      fail();
    }
  });

  it("Check the invalid entries", function () {
    try {
      let obj = wrapper.instance();
      obj.state.inputList = invalidRoomEntry1;
      let object = wrapper.find("Button").at(3);
      object.props().handleClick({ preventDefault: () => {} });
      expect(obj.state.errors).toStrictEqual({
        roomtype: "Invalid room type",
        roomcount: "Invalid room count",
        price: "Price can't be empty",
        maxallowed: "Max persons allowed can't be empty",
      });
    } catch (error) {
      fail();
    }
  });

  it("Selected Room", function () {
    let object = wrapper.instance();
    let e = { label: "Delux" };
    object.selectValue(e, 0);
    expect(object.state.inputList[0].roomtype).toBe("Delux");
  });

  it("Multi Select Inclusions", () => {
    let object = wrapper.instance();
    let e = { key: "Full Board" };
    object.multiSelect(e, 0);
    expect(object.state.inputList[0].selectedInclusions).toStrictEqual({
      key: "Full Board",
    });
  });

  //handleInputChange
  it("Test max person Input fields", () => {
    let object = wrapper.instance();
    let input = wrapper.find("Input").at(0);
    let event = { target: { name: "maxallowed", value: "51" } };
    input.simulate("change", event, 1);
  });

  it("Test room count Input fields", () => {
    let object = wrapper.instance();
    let input = wrapper.find("Input").at(1);
    let event = { target: { name: "maxallowed", value: "51" } };
    input.simulate("change", event, 1);
  });

  it("Test room price Input fields", () => {
    let object = wrapper.instance();
    let input = wrapper.find("Input").at(2);
    let event = { target: { name: "maxallowed", value: "51" } };
    input.simulate("change", event, 1);
  });

  it("Test Muliselect on select", () => {
    let object = wrapper.instance();
    let mutiSelect = wrapper.find("Multiselect").at(0);
    let event = { target: { name: "maxallowed", value: "51" } };
    mutiSelect.simulate("select", event, 1);
    expect(object.state.inputList[1].selectedInclusions).toStrictEqual([
      { key: "Free Wifi" },
      { key: "Free Breakfast" },
      { key: "Breakfast Buffet" },
    ]);
  });

  it("Test Muliselect on remove", () => {
    let object = wrapper.instance();
    let mutiSelect = wrapper.find("Multiselect").at(0);
    let event = { target: { name: "maxallowed", value: "51" } };
    mutiSelect.simulate("remove", event, 1);
  });

  it("Mock Room CallBack ", () => {
    let obj = wrapper.instance();
    obj.state.inputList = validRoomList;
    let object = wrapper.find("Button").at(3);
    object.props().handleClick({ preventDefault: () => {} });

    expect(mockRoomCallBack).toHaveBeenCalledWith(obj.state.inputList);
  });
});

const mockRoomCallBack = jest.fn();

let hotelRoom = {
  roomList: [
    {
      roomtype: "Semi Deluxe",
      maxallowed: "2",
      roomcount: "20",
      price: "3000",
      selectedInclusions: [
        { key: "Free Wifi" },
        { key: "Free Breakfast" },
        { key: "Breakfast Buffet" },
      ],
    },
    {
      roomtype: "",
      maxallowed: "2",
      roomcount: "",
      price: "3000",
      selectedInclusions: [
        { key: "Free Wifi" },
        { key: "Free Breakfast" },
        { key: "Breakfast Buffet" },
      ],
    },
  ],

  roomtypes: ROOMTYPES,
  selectedValue: "",
  inclusions: INCLUSIONS,
  roomCallback: mockRoomCallBack,
};

let invalidRoomEntry = [
  {
    roomtype: "Semi Deluxe",
    maxallowed: "2",
    roomcount: "20",
    price: "3000",
    selectedInclusions: [
      { key: "Free Wifi" },
      { key: "Free Breakfast" },
      { key: "Breakfast Buffet" },
    ],
  },
  {
    roomtype: "123",
    maxallowed: "-2",
    roomcount: "-2",
    price: "-3000",
    selectedInclusions: [
      { key: "Free Wifi" },
      { key: "Free Breakfast" },
      { key: "Breakfast Buffet" },
    ],
  },
];

let invalidRoomEntry1 = [
  {
    roomtype: "Semi Deluxe",
    maxallowed: "2",
    roomcount: "20",
    price: "3000",
    selectedInclusions: [
      { key: "Free Wifi" },
      { key: "Free Breakfast" },
      { key: "Breakfast Buffet" },
    ],
  },
  {
    roomtype: "123",
    maxallowed: "",
    roomcount: "-2",
    price: "",
    selectedInclusions: [
      { key: "Free Wifi" },
      { key: "Free Breakfast" },
      { key: "Breakfast Buffet" },
    ],
  },
];

let validRoomList = [
  {
    roomtype: "Semi Deluxe",
    maxallowed: "2",
    roomcount: "20",
    price: "3000",
    selectedInclusions: [
      { key: "Free Wifi" },
      { key: "Free Breakfast" },
      { key: "Breakfast Buffet" },
    ],
  },
];
