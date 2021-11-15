import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
import Pagination from '../../component/reviewDetails/Pagination';
/* istanbul ignore next */

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Pagination />);
});
describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  // it("To count numbers of tags on review details Component", function () {
  //   try {
  //     let count_div = wrapper.find("div").length;
  //     let count_a = wrapper.find("a").length;
  //     expect(count_div).toBe(2);
  //     expect(count_a).toBe(1);
     
  //   } catch (error) {
  //     fail();
  //   }
  // });

});
