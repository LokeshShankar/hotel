import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
import HotelPaymentReport from "../../component/userReport/HotelPaymentReport";
configure({
  adapter: new Adapter(),
});

let wrapper;

describe("Testing user report components", function () {
  it("Testing whether the object is created or not", function () {
    try {
        wrapper = shallow(<HotelPaymentReport/>);
        let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of div tags on user report components ", function () {
    try {
        wrapper = shallow(<HotelPaymentReport/>);
      let count_div = wrapper.find("div").length;
      expect(count_div).toBe(11);
    } catch (error) {
      fail();
    }
  });

  it("To count numbers of label tags on user report components ", function () {
    try {
        wrapper = shallow(<HotelPaymentReport/>);
      let count_label = wrapper.find("label").length;
      expect(count_label).toBe(5);
    } catch (error) {
      fail();
    }
  });

  it("To count numbers of p tags on user report components ", function () {
    try {
        wrapper = shallow(<HotelPaymentReport/>);
      let count_p = wrapper.find("p").length;
      expect(count_p).toBe(5);
    } catch (error) {
      fail();
    }
  });

  it("To count numbers of h2 tags on user report components ", function () {
    try {
        wrapper = shallow(<HotelPaymentReport/>);
      let count_h2 = wrapper.find("h2").length;
      expect(count_h2).toBe(1);
    } catch (error) {
      fail();
    }
  });
});
