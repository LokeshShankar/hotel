import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import DeleteHotel from "../../component/editanddeletehotel/DeleteHotel";
import axios from "axios";

configure({
  adapter: new Adapter(),
});

let wrapper;
let hotel={hid:12}
beforeEach(() => {
  axios.delete = jest.fn().mockResolvedValue({ data: "Deleted Successfully" });
  wrapper = shallow(<DeleteHotel location={{state: hotel}} history={{ push: () => {} }}/>);
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

describe("Testing Hotel Address Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("Set hotel Id", async function () {
    let obj = wrapper.instance();

    expect(obj.state.hotelId).toBe(12);
  });

  it("Deleting the hotel", async function () {
    wrapper.setState({ flag: 1, hotelId: "22" });
    let obj = wrapper.instance();
    let button = wrapper.find("Button").at(0);
    await button.props().handleClick({ preventDefault: () => {} });

    expect(obj.state.response).toBe("Deleted Successfully");
  });

  it("Testing alert No", async function () {
    wrapper.setState({ flag: 1, hotelId: "22" });
    let obj = wrapper.instance();
    let button = wrapper.find("Button").at(1);
    await button.props().handleClick({ preventDefault: () => {} });

    expect(obj.state.response).toBe("Not delete");
  });

  it("Testing when hotel is not deleted", async function () {
    axios.delete.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );
    wrapper.setState({
      flag: 1,
      hotelId: "22",
      response: "Error: Network Error",
    });
    let obj = wrapper.instance();
    let button = wrapper.find("Button").at(0);
    await button.props().handleClick({ preventDefault: () => {} });
    expect(obj.state.response.toString()).toBe("Error: Network Error");
  });
  // it("Set hotel Id", async function () {
  //   let obj = wrapper.instance();
  //   obj.delete("123");

  //   expect(obj.state.hotelId).toBe("123");
  // });

  // it("Deleting the hotel", async function () {
  //   wrapper.setState({ flag: 1, hotelId: "22" });
  //   let obj = wrapper.instance();
  //   let button = wrapper.find("Button").at(0);
  //   await button.props().handleClick({ preventDefault: () => {} });

  //   expect(obj.state.response).toBe("Deleted Successfully");
  // });

  // it("Testing alert No", async function () {
  //   wrapper.setState({ flag: 1, hotelId: "22" });
  //   let obj = wrapper.instance();
  //   let button = wrapper.find("Button").at(1);
  //   await button.props().handleClick({ preventDefault: () => {} });

  //   expect(obj.state.response).toBe("Not delete");
  // });

  // it("Testing when hotel is not deleted", async function () {
  //   axios.delete.mockImplementationOnce(() =>
  //     Promise.reject(new Error("Network Error"))
  //   );
  //   wrapper.setState({
  //     flag: 1,
  //     hotelId: "22",
  //     response: "Error: Network Error",
  //   });
  //   let obj = wrapper.instance();
  //   let button = wrapper.find("Button").at(0);
  //   await button.props().handleClick({ preventDefault: () => {} });
  //   expect(obj.state.response.toString()).toBe("Error: Network Error");
  // });
});
