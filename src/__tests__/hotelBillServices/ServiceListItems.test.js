import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import ServiceListItems from "../../component/hotelBillServices/ServiceListItems";
import axios from "axios";
let component;
configure({
  adapter: new Adapter(),
});
const ServiceListItem = [
  {
    name: "Breakfast",
    price: 500,
    available: true,
  },
  {
    name: "Lunch",
    price: 600,
    available: false,
  },
  {
    name: "Snacks",
    price: 700,
    available: true,
  },
  {
    name: "Dinner",
    price: 800,
    available: false,
  },
];
let wrapper;
beforeEach(() => {
  axios.put = jest.fn().mockResolvedValue({ data: "Updated Successfully" }); // Mock Data for axios call
  wrapper = shallow(<ServiceListItems key={0} {...ServiceListItem[0]} />);
});

describe("Testing ServiceListItems Component in hotelBillServices", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      //      console.log(error);
    }
  });

  it("To count numbers of tags on ServiceListItems Component ", function () {
    try {
      let count_div = wrapper.find("div").length;
      expect(count_div).toBe(1);
    } catch (error) {
      fail();
    }
  });

  it("To Check click on Edit Price ", function () {
    wrapper
      .find("button")
      .at(0)
      .props()
      .onClick({ preventDefault: () => {} });
    let obj = wrapper.instance();
    expect(obj.state.price).toBe(500);
  });

  it("To test handlePriceChnage function", function () {
    let obj = wrapper.instance();
    let event = { target: { value: 1000 } };
    obj.handlePriceChnage(event);
    expect(obj.state.price).toBe(1000);
  });

  it("To test handleEditClick", function () {
    document.getElementById = jest.fn().mockReturnValue({});
    let obj = wrapper.instance();
    obj.handleEditClick();
    expect(obj.state.editing).toBe(true);
  });
});
