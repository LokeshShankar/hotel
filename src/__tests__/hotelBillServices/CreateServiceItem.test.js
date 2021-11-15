import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import CreateServiceItem from "../../component/hotelBillServices/CreateServiceItem";
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
const createItem = jest.fn();
let wrapper;
beforeEach(() => {
  wrapper = shallow(
    <CreateServiceItem
      ServiceListItem={ServiceListItem}
      createItem={createItem}
    />
  );
});

describe("Testing CreateItem Component in hotelBillServices", function () {
  it("Testing whether the object is created or not", function () {
    let obj = wrapper.instance();
  });

  it("To count numbers of tags on CreateItem  Component ", function () {
    let count_div = wrapper.find("div").length;
    expect(count_div).toBe(1);
  });

  it("To count numbers of button tags on CreateItem  Component ", function () {
    let count_button = wrapper.find("button").length;
    expect(count_button).toBe(1);
  });

  it("To check the value of newServiceName in state while entering value in Input ", function () {
    let object = wrapper.find("input").at(0);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "newServiceName", value: "Lunch" },
    });
    let obj = wrapper.instance();
    expect(obj.state.newServiceName).toBe("Lunch");
  });

  it("To check the value of newPrice in state while entering value in Input ", function () {
    let object = wrapper.find("input").at(1);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "newPrice", value: 230 },
    });
    let obj = wrapper.instance();
    expect(obj.state.newPrice).toBe(230);
  });

  it("form submit check when Items is in list", function () {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        preventDefault: () => {},
        target: { name: "newServiceName", value: "Lunch" },
      });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", {
        preventDefault: () => {},
        target: { name: "newPrice", value: 230 },
      });
    wrapper
      .find("form")
      .props()
      .onSubmit({ preventDefault: () => {} });
    expect(wrapper.state()).toStrictEqual({
      newServiceName: "",
      newPrice: "",
    });
  });

  it("form submit check when newServiceName is empty", function () {
    wrapper
      .find("input")
      .at(1)
      .simulate("change", {
        preventDefault: () => {},
        target: { name: "newPrice", value: 230 },
      });
    wrapper
      .find("form")
      .props()
      .onSubmit({ preventDefault: () => {} });
    window.alert = jest.fn();
    expect(wrapper.state()).toStrictEqual({
      newServiceName: "",
      newPrice: 230,
    });
  });

  it("form submit check when newPrice is empty", function () {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        preventDefault: () => {},
        target: { name: "newServiceName", value: "Lunch" },
      });
    wrapper
      .find("form")
      .props()
      .onSubmit({ preventDefault: () => {} });
    window.alert = jest.fn();
    expect(wrapper.state()).toStrictEqual({
      newServiceName: "Lunch",
      newPrice: 0,
    });
  });

  it("form submit check when Items is not in the list", function () {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        preventDefault: () => {},
        target: { name: "newServiceName", value: "Drinks" },
      });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", {
        preventDefault: () => {},
        target: { name: "newPrice", value: 1000 },
      });
    wrapper
      .find("form")
      .props()
      .onSubmit({ preventDefault: () => {} });
    window.alert = jest.fn();
    expect(wrapper.state()).toStrictEqual({
      newServiceName: "",
      newPrice: "",
    });
  });
});
