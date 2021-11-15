import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import Profile from "../../component/profile/Profile";
import axios from "axios";

import "../../setupTests";
import { Profiler } from "react";

configure({
  adapter: new Adapter(),
});

describe("Testing Profile component Mounting", function () {
  it("Testing whether the Profile component is mount or not", function () {
    try {
      // const wrapper = shallow(<Profile></Profile>)
      const wrapper = shallow(<Profile></Profile>);
    } catch (error) {
      fail();
    }
  });

  it("Testing whether the Profile object is created or not", function () {
    try {
      const wrapper = shallow(<Profile></Profile>);
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  //   it("Testing the initial state values of Profile", function () {
  //     try {
  //       const wrapper = shallow(<Profile></Profile>);
  //       let obj = wrapper.instance();
  //       // let state_val = obj.state.isChecked;

  //       let firstName = obj.state.firstName;
  //       let lastName = obj.state.lastName;
  //       let email = obj.state.email;
  //       let phone = obj.state.phone;
  //       let yearOfBirth = obj.state.yearOfBirth;
  //       let address = obj.state.address;
  //       let pinCode = obj.state.pincode;
  //       let city = obj.state.city;
  //       let groupName = obj.state.groupName;
  //       let errors = obj.state.errors;
  //       let response = obj.state.response;
  //       let err = obj.state.err;

  //       expect(firstName).toBe(undefined);
  //       expect(lastName).toBe(undefined);
  //       expect(email).toBe(undefined);
  //       expect(phone).toBe(undefined);
  //       expect(yearOfBirth).toBe(undefined);
  //       expect(address).toBe(undefined);

  //       expect(pinCode).toBe(undefined);
  //       expect(city).toBe(undefined);
  //     //   expect(groupName).toBe(undefined);
  //         console.log(firstName)
  //       //   expect(response).toBe("");
  //       //   expect(err).toBe("");
  //     } catch (error) {
  //       console.log(error);
  //       fail();
  //     }
  //   });
});

describe("Testing User Profile Component", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Profile />);
  });

  it("should have a h2 tag with text Edit Profile", () => {
    expect(wrapper.find("div").at(1).text()).toBe("Update your Profile");
  });

  it("should have a form component", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });

  it("should have input for current password, new password and confirm new password", () => {
    expect(wrapper.find("p#input-first-name")).toHaveLength(1);
    expect(wrapper.find("p#input-last-name")).toHaveLength(1);
    expect(wrapper.find("p#input-email")).toHaveLength(1);
  });

  it("should have a button component", () => {
    expect(wrapper.find('button')).toHaveLength(2);
  });


  // it("update is successful", async () => {
  //   axios.put = jest.fn();
  //   axios.put.mockResolvedValueOnce({})
  //   // .mockResolvedValueOnce({});
  //   let obj = await wrapper.instance();
  //   // {preventDefault: () => {}}
  //   await obj.handleSubmit();
  //   // await is called two times as nested axios call required updates in state
  //   // or we can say asynchronous functionality
  //   // obj = await wrapper.instance();
  //   expect(obj.state.message).toBe("");
  // });

  // it("failiure in update", async () => {
  //   axios.put = jest.fn();
  //   await axios.put.mockImplementationOnce(() => Promise.reject());
  //   let obj = wrapper.instance();
  //   // { preventDefault: () => {} }
  //   await obj.handleSubmit();
  //   expect(obj.state.message).toBe("");
  // });
});
