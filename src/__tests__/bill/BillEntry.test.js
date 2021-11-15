import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import BillEntry from "../../component/bill/BillEntry";
import axios from "axios";
configure({
  adapter: new Adapter(),
});

let wrapper;
const location = { state: { hotelId: 10 } };
beforeEach(() => {
  wrapper = shallow(
    <BillEntry history={{ push: () => {} }} location={location} />
  );
});

window.alert = jest.fn();

describe("Testing Bill Entry Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("To count numbers of Input tags on Bill Entry ", function () {
    try {
      let obj = wrapper.instance();
      let count = wrapper.find("Input").length;
      expect(count).toBe(3);
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of Button tags on Bill Entry ", function () {
    try {
      let obj = wrapper.instance();
      let count = wrapper.find("Button").length;
      expect(count).toBe(1);
    } catch (error) {
      fail();
    }
  });
  it("To check the value of booking id in state while entering value in Bill Entry ", function () {
    let object = wrapper.find("Input").at(0);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "booking_id", value: "1" },
    });
    let obj = wrapper.instance();
    expect(obj.state.booking_id).toBe("1");
  });
  it("To check the value of discount in state while entering value in Bill Entry ", function () {
    let object = wrapper.find("Input").at(2);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "discount", value: "10" },
    });
    let obj = wrapper.instance();
    expect(obj.state.discount).toBe("10");
  });
  // it("To check the value of quantity in state while entering value in Bill Entry ", function () {
  //   let object = wrapper.find("Input").at(3);
  //   object.simulate("change", {
  //     preventDefault: () => {},
  //     target: { name: "quantity", value: "5" },
  //   });
  //   let obj = wrapper.instance();
  //   console.log(obj.state.quantity);
  //   expect(obj.state.quantity).toBe("5");
  // });
  it("To check for empty input feilds", function () {
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    object.props().handleClick({
      preventDefault: () => {},
    });
    let obj = wrapper.instance();
    expect(obj.state.errors).toEqual({
      service: "Service can't be empty",
    });
  });
  it("To check for empty quantity field", function () {
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    fillDataInBillEntry(inputTags.at(1), "quantity", "");
    object.props().handleClick({
      preventDefault: () => {},
    });
    let obj = wrapper.instance();
    // expect(obj.state.errors).toEqual({
    //   service: "Service can't be empty",
    // });
  });
  it("To check for empty input feilds ", async function () {
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    fillDataInBillEntry(inputTags.at(0), "booking_id", "1");
    fillDataInBillEntry(inputTags.at(2), "discount", "10");
    object.props().handleClick({
      preventDefault: () => {},
    });
    let obj = await wrapper.instance();
    expect(obj.state.errors).toEqual({
      service: "Service can't be empty",
    });
  });
  it("To check for adding bill details successfully", async function () {
    axios.post = jest.fn();
    await axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: "Bill Entry inserted" })
    );
    const events = {
      preventDefault: () => {},
    };
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    mockInfoToAddBill(inputTags);
    let obj = wrapper.instance();
    // console.log(obj.state)
    object.props().handleClick({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
    expect(obj.state.response).toEqual("");
  });
  it("To check for adding bill details unsuccessfully", async function () {
    axios.post = jest.fn();
    await axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error("bill entry not inserted"))
    );
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    mockInfoToAddBill(inputTags);
    let obj = wrapper.instance();
    object.props().handleClick({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
    obj = await wrapper.instance();
    // expect(obj.state.err).toEqual(new Error("bill entry not inserted"));
  });

  //Till here

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
    // console.log(obj.state.errors);
    expect(obj.state.errors).toEqual({
      service: "Service can't be empty",
    });
  });
});
it("To check for adding bill details unsuccessfully",async  function () {
  axios.post = jest.fn()
        await axios.post.mockImplementationOnce(() =>
          Promise.reject(new Error("bill entry not inserted"))
        );
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    // mockInfoToAddBill(inputTags);
    let obj = wrapper.instance()
    // console.log(obj.state)
    object.props().handleClick({
      preventDefault: () => {},
    });
    obj =await  wrapper.instance()
    obj =await  wrapper.instance()
    // expect(obj.state.err).toEqual(new Error("bill entry not inserted"));
});
const fillDataInBillEntry = (object, tagName, tagValue) => {
  object.simulate("change", {
    preventDefault: () => {},
    target: { name: tagName, value: tagValue },
  });
};

function mockInfoToAddBill(inputTags) {
  fillDataInBillEntry(inputTags.at(0), "booking_id", "1");
  fillDataInBillEntry(inputTags.at(0), "service", "2");
  fillDataInBillEntry(inputTags.at(2), "discount", "10");
  fillDataInBillEntry(inputTags.at(0), "quantity", "10");
}
