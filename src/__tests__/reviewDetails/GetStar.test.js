import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
import GetStar from '../../component/reviewDetails/GetStar';
configure({
  adapter: new Adapter(),
});

let wrapper;
// beforeEach(() => {
//   wrapper = shallow(<GetStar />);
// });
let rating={
  hotelReview:3
}
describe("Testing review details Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
        wrapper = shallow(<GetStar rating={rating.hotelReview} />);
        let obj = wrapper.instance();
      
    } catch (error) {
      fail();
    }
  });
});
