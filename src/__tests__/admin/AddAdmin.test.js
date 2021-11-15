import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import AddAdmin from "../../component/admin/AddAdmin";
import axios from "axios";
configure({
  adapter: new Adapter(),
});

let wrapper;

beforeEach(() => {
  wrapper = shallow(<AddAdmin history={{ push: () => {} }} />);
});

window.alert = jest.fn();

describe("Testing Add Admin Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("To count numbers of Input tags on Add Admin ", function () {
    try {
      let obj = wrapper.instance();
      let count = wrapper.find("Input").length;
      expect(count).toBe(9);
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of Button tags on Add Admin ", function () {
    try {
      let obj = wrapper.instance();
      let count = wrapper.find("Button").length;
      expect(count).toBe(1);
    } catch (error) {
      fail();
    }
  });
  it("To check the value of fname in state while entering value in Admin Details ", function () {
    let object = wrapper.find("Input").at(0);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "afname", value: "Sherlock" },
    });
    let obj = wrapper.instance();
    expect(obj.state.afname).toBe("Sherlock");
  });
  it("To check the value of lname in state while entering value in Admin Details ", function () {
    let object = wrapper.find("Input").at(1);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "afname", value: "Holmes" },
    });
    let obj = wrapper.instance();
    expect(obj.state.afname).toBe("Holmes");
  });
  it("To check the value of local address in state while entering value in Admin Details ", function () {
    let object = wrapper.find("Input").at(2);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "alocal_address", value: "221B Baker Street" },
    });
    let obj = wrapper.instance();
    expect(obj.state.alocal_address).toBe("221B Baker Street");
  });
  it("To check the value of pin code in state while entering value in Admin Details ", function () {
    let object = wrapper.find("Input").at(3);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "apin_code", value: "123456" },
    });
    let obj = wrapper.instance();
    expect(obj.state.apin_code).toBe("123456");
  });
  it("To check the value of city in state while entering value in Admin Details ", function () {
    let object = wrapper.find("Input").at(4);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "acity", value: "London" },
    });
    let obj = wrapper.instance();
    expect(obj.state.acity).toBe("London");
  });
  it("To check the value of email in state while entering value in Admin Details ", function () {
    let object = wrapper.find("Input").at(5);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "aemail", value: "sherlock.molly@gmail.com" },
    });
    let obj = wrapper.instance();
    expect(obj.state.aemail).toBe("sherlock.molly@gmail.com");
  });
  it("To check the value of password in state while entering value in Admin Details ", function () {
    let object = wrapper.find("Input").at(6);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "apassword", value: "molly_hooper" },
    });
    let obj = wrapper.instance();
    expect(obj.state.apassword).toBe("molly_hooper");
  });
  it("To check the value of phone no in state while entering value in Admin Details ", function () {
    let object = wrapper.find("Input").at(7);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "aphone", value: "9988776655" },
    });
    let obj = wrapper.instance();
    expect(obj.state.aphone).toBe("9988776655");
  });
  it("To check the value of year of birth in state while entering value in Admin Details ", function () {
    let object = wrapper.find("Input").at(8);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "ayear_of_birth", value: "1854" },
    });
    let obj = wrapper.instance();
    expect(obj.state.ayear_of_birth).toBe("1854");
  });
  it("To check for empty input feilds", function () {
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    // object.simulate("click", {
    //   preventDefault: () => {},
    // });
    object.props().handleClick({
      preventDefault: () => {},
    });
    let obj = wrapper.instance();
    // obj.({preventDefault : () => {}});
    //     obj = await wrapper.instance();
    //console.log(wrapper.state() + "3");
    // console.log(obj.state);
    expect(obj.state.errors).toEqual({
      fname: "First name can't be empty",
      lname: "Last name can't be empty",
      local_address: "Local address can't be empty",
      city: "city can't be empty",
      pin_code: "PinCode can't be empty",
      password: "Password can't be empty",
      year_of_birth: "Year can't be empty",
      phone_no: "Phone no can't be empty",
      email: "Email address can't be empty",
    });
  });
  it("To check for empty input feilds and invalid input fields", async function () {
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    // object.simulate("click", {
    //   preventDefault: () => {},
    // });
    fillDataInAddAdmin(inputTags.at(5), "aemail", "sherlockkk");
    fillDataInAddAdmin(inputTags.at(7), "aphone", "abcde");
    object.props().handleClick({
      preventDefault: () => {},
    });
    let obj = await wrapper.instance();
    // obj.({preventDefault : () => {}});
    //     obj = await wrapper.instance();
    //console.log(wrapper.state() + "3");
    //  console.log(obj.state);
    expect(obj.state.errors).toEqual({
      fname: "First name can't be empty",
      lname: "Last name can't be empty",
      local_address: "Local address can't be empty",
      city: "city can't be empty",
      pin_code: "PinCode can't be empty",
      password: "Password can't be empty",
      year_of_birth: "Year can't be empty",
      phone_no: "Invalid phone no",
      email: "Invalid email id",
    });
  });
  it("To check for adding admin details successfully", async function () {
    axios.post = jest.fn();
    await axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: "Admin Details inserted" })
    );
    const events = {
      preventDefault: () => {},
    };
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    mockInfoToAddAdmin(inputTags);
    let obj = wrapper.instance();
    // console.log(obj.state)
    object.props().handleClick({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
    expect(obj.state.response).toEqual("Admin Details inserted");
  });
  it("To check for adding admin details unsuccessfully", async function () {
    axios.post = jest.fn();
    await axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error("admin not inserted"))
    );

    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    mockInfoToAddAdmin(inputTags);
    let obj = wrapper.instance();
    // console.log(obj.state)
    object.props().handleClick({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
    obj = await wrapper.instance();
    expect(obj.state.err).toEqual(new Error("admin not inserted"));
  });
  it("To check for empty input feilds", async function () {
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    // object.simulate("click", {
    //   preventDefault: () => {},
    // });
    object.props().handleClick({
      preventDefault: () => {},
    });
    let obj = await wrapper.instance();
    // obj.({preventDefault : () => {}});
    //     obj = await wrapper.instance();
    //console.log(wrapper.state() + "3");
    // console.log(obj.state);
    expect(obj.state.errors).toEqual({
      fname: "First name can't be empty",
      lname: "Last name can't be empty",
      local_address: "Local address can't be empty",
      city: "city can't be empty",
      pin_code: "PinCode can't be empty",
      password: "Password can't be empty",
      year_of_birth: "Year can't be empty",
      phone_no: "Phone no can't be empty",
      email: "Email address can't be empty",
    });
  });
});

const fillDataInAddAdmin = (object, tagName, tagValue) => {
  object.simulate("change", {
    preventDefault: () => {},
    target: { name: tagName, value: tagValue },
  });
};

function mockInfoToAddAdmin(inputTags) {
  fillDataInAddAdmin(inputTags.at(0), "afname", "Sherlock");
  fillDataInAddAdmin(inputTags.at(1), "alname", "Holmes");
  fillDataInAddAdmin(inputTags.at(2), "alocal_address", "221B Baker Street");
  fillDataInAddAdmin(inputTags.at(3), "apin_code", "125689");
  fillDataInAddAdmin(inputTags.at(4), "acity", "London");
  fillDataInAddAdmin(inputTags.at(5), "aemail", "sherlock@molly.com");
  fillDataInAddAdmin(inputTags.at(6), "apassword", "sherlockandmolly");
  fillDataInAddAdmin(inputTags.at(7), "aphone", "4512789945");
  fillDataInAddAdmin(inputTags.at(8), "ayear_of_birth", "1854");
}
