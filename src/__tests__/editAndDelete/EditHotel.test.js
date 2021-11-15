import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import axios from "axios";
import EditHotel from "../../component/editanddeletehotel/EditHotel";

configure({
  adapter: new Adapter(),
});
let hotel={hid:23}
let wrapper;
beforeEach(() => {
  axios.get = jest.fn().mockResolvedValue({ data: MOCK_DATA });
  wrapper = shallow(<EditHotel location={{state: hotel}}/>);
});
jest.spyOn(window, 'alert').mockImplementation(() => {});
describe("Testing Hotel Address Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("Get Hotel Details", async function () {
    let obj = wrapper.instance();
    await obj.edit(23);
    expect(obj.state.hotel.hname).toBe(MOCK_DATA.hotelName);
  });

  it("Null Details from database", async function () {
    let obj = wrapper.instance();
    axios.get = jest.fn().mockResolvedValue({ data: "" });
    await obj.edit(23);
    expect(obj.state.err).toBe("ID doesn't exist");
  });
});

const MOCK_DATA = {
  hotel_id: 23,
  hotelName: "asf1",
  phone: "7894561235",
  email: "redis@yahoo.com",
  checkInTime: "2221-12-22",
  checkOutTime: "2222-12-22",
  taxRate: 12.0,
  localAddress: "Delhi",
  region: "sad",
  importantLandmarks: "Delhi",
  city: "Delhi",
  pincode: "110053",
  coordinates: null,
  rooms: [
    {
      roomTypeName: "Semi Deluxe",
      roomCapacity: 2,
      totalRoomCount: 3,
      roomPrice: 4444,
      inclusions: "Free Wifi,Breakfast Buffet,Free Breakfast, Lunch and Dinner",
    },
    {
      roomTypeName: "Deluxe",
      roomCapacity: 2,
      totalRoomCount: 3,
      roomPrice: 3333,
      inclusions: "Free Breakfast",
    },
  ],
  amenities:
    "Room Service,Restaurant/Coffee Shop,Lounge,Health-Spa,Dining Area,Childcare Services",
};