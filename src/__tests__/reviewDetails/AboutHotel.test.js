import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
configure({
  adapter: new Adapter(),
});

let wrapper;
describe("Testing Add Hotel Component", function () {
  xit("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  xit("To count numbers of tags on review details Component ", function () {
    try {
      let count_div = wrapper.find("div").length;
      let count_span = wrapper.find("span").length;
      let count_ul = wrapper.find("ul").length;
      expect(count_div).toBe(5);
      expect(count_span).toBe(4);
      expect(count_ul).toBe(1);
    } catch (error) {
      fail();
    }
  });
});

let propData = {
  hotel: {
    amenities: "WIFI, Dinner, Breakfast",
  },
};
