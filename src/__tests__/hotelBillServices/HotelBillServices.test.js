import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import HotelBillServices from "../../component/hotelBillServices/HotelBillServices";
import axios from "axios";
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

describe("Testing CreateItem Component in hotelBillServices", function () {
  it("Testing whether the object is created or not", function () {
    axios.get = jest.fn().mockResolvedValue({ data: "Added " });
    wrapper = shallow(<HotelBillServices {...prop} />);
    let obj = wrapper.instance();
  });

  it("To count numbers of tags on hotelBillServices Component ", function () {
    let count_div = wrapper.find("div").length;
    expect(count_div).toBe(3);
  });

  it("To check CreateItem Function ", function () {
    axios.get = jest.fn().mockResolvedValue({ data: "Added " });
    wrapper = shallow(<HotelBillServices {...prop} />);
    let obj = wrapper.instance();
    obj.createItem("Drinks", 500);
    expect(obj.state.ServiceListItem).toStrictEqual([
      { name: "Drinks", price: 500, available: true, hotelId: 0 },
    ]);
  });

  // it("To check Axios Failed response ", function () {
  //   axios.get = jest.fn().mockResolvedValue({ data: "Added Successfully" });
  //   let obj = wrapper.instance();
  // });

  it("To check createItem Function ", function () {
    axios.get = jest.fn().mockResolvedValue({ data: "Added " });
    axios.post = jest.fn().mockResolvedValue({ data: "Added " });
    wrapper = shallow(<HotelBillServices {...prop} />);
    let obj = wrapper.instance();
    obj.createItem("ItemName", 300);
    // console.log(obj.state);
    expect(obj.state.ServiceListItem[0].price).toBe(300);
  });
});

const prop = {
  history: {
    location: {
      state: 14,
    },
  },
};
