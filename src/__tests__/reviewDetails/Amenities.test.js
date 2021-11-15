import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import Amenities from "../../component/reviewDetails/Amenities";
configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Amenities {...prop} />);
});

describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("To count numbers of tags on review details Component ", function () {
    try {
      let count_div = wrapper.find("div").length;
      let count_h4 = wrapper.find("h4").length;
      let count_hr = wrapper.find("hr").length;
      let count_span = wrapper.find("span").length;
      expect(count_div).toBe(1);
      expect(count_h4).toBe(1);
      expect(count_hr).toBe(1);
      expect(count_span).toBe(0);
    } catch (error) {
      fail();
    }
  });
});

let prop = {
  hotel: {
    amenities: "WIFI, Dinner",
  },
};
