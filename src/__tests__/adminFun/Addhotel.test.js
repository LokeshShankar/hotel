import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import AddHotel from "../../component/addhotel/AddHotel";
import axios from "axios";
import { DUMMY_STATEOBJECT } from "../../component/utility/Constant";

configure({
  adapter: new Adapter(),
});

let wrapper;
const completed = jest.fn();
beforeEach(() => {
  axios.post = jest.fn().mockResolvedValue({ data: "Added Successfully" }); // Mock Data for axios call
  axios.put = jest.fn().mockResolvedValue({ data: "Updated Successfully" }); // Mock Data for axios call

  wrapper = shallow(<AddHotel {...DUMMY_STATEOBJECT} completed={completed} />);
});

describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("Testing whether the hotel is added or not", async function () {
    try {
      let obj = wrapper.instance();
      await obj.handleRoomCallback(DUMMY_STATEOBJECT.roomList);
      expect(obj.state.response).toBe("Added Successfully");
    } catch (error) {
      fail();
    }
  });

  it("Exception while adding hotel", async function () {
    try {
      wrapper.setState({ err: "Error: Network Error" });
      await axios.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Network Error"))
      );
      let obj = wrapper.instance();
      await obj.handleRoomCallback(DUMMY_STATEOBJECT.roomList);
      expect(obj.state.err).toBe("Error: Network Error");
    } catch (error) {
      fail();
    }
  });

  it("Getting roomList from AddRoom component", async function () {
    try {
      let obj = wrapper.instance();
      obj.state.hid = "12";
      await obj.handleRoomCallback(DUMMY_STATEOBJECT.roomList);
      // expect(obj.state.response).toBe("Updated Successfully");
    } catch (error) {
      fail();
    }
  });

  it("Exception while updating hotel", async function () {
    try {
      wrapper.setState({ err: "Error: Network Error" });
      await axios.put.mockImplementationOnce(() =>
        Promise.reject(new Error("Network Error"))
      );
      let obj = wrapper.instance();
      obj.state.hid = "12";
      await obj.handleRoomCallback(DUMMY_STATEOBJECT.roomList);
      expect(obj.state.err).toBe("Error: Network Error");
    } catch (error) {
      fail();
    }
  });

  it("Testing whether the hotel details are updated or not", function () {
    try {
      let obj = wrapper.instance();
      obj.handleHotelDetailsCallback(HotelDetails);
      expect(obj.state.hname).toBe("Sherdon");
    } catch (error) {
      fail();
    }
  });

  it("Testing whether the hotel Address is updated or not", function () {
    try {
      let obj = wrapper.instance();
      obj.handleHotelAddressCallback(HotelAddress);
      expect(obj.state.city).toBe("Mumbai");
    } catch (error) {
      fail();
    }
  });

  it("checking the flag status", function () {
    try {
      let obj = wrapper.instance();
      obj.state.addressFlag = 1;
      obj.addHotel();
      expect(obj.state.addressFlag).toBe(0);
    } catch (error) {
      fail();
    }
  });
});

let HotelDetails = {
  hname: "Sherdon",
  hphone: DUMMY_STATEOBJECT.hphone,
  hemail: DUMMY_STATEOBJECT.hemail,
  htax: DUMMY_STATEOBJECT.htax,
  checkInTime: DUMMY_STATEOBJECT.checkInTime,
  checkOutTime: DUMMY_STATEOBJECT.checkOutTime,
};

let HotelAddress = {
  localAddress: DUMMY_STATEOBJECT.localAddress,
  city: "Mumbai",
  region: DUMMY_STATEOBJECT.region,
  pincode: DUMMY_STATEOBJECT.pincode,
};
