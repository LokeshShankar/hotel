import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
// import Review from '../../component/reviewAddEditDelete/Review';
configure({
  adapter: new Adapter(),
});

// let wrapper;
// beforeEach(() => {
//   wrapper = shallow();
// });

describe("Testing Add Hotel Review Component", function () {
  it("Testing whether the object is created or not", function () {
  });

//   it("To count numbers of tags on add Hotel review component ", function () {
//     try {
//       let count_li = wrapper.find("li").length;
//       let count_h3 = wrapper.find("h3").length;
//       let count_div = wrapper.find("div").length;

//       expect(count_li).toBe(1);
//       expect(count_h3).toBe(1);
//       expect(count_div).toBe(3);
//     } catch (error) {
//       fail();
//     }
//   });
});
