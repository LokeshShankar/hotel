import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import ReviewCard from "../../component/reviewDetails/ReviewCard";
import Button from "../../component/utility/Button";

configure({
  adapter: new Adapter(),
});

let wrapper;
// beforeEach(() => {
//   wrapper = shallow(<ReviewCard />);
// });
let review = {
  reviewId: 1,
  email: "shashank@gmail.com",
  userName: "john",
  reviewDate: "24 aug, 2021",
  review: "very good hotel",
  rating: "3",
};

describe("Testing Review card Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      wrapper = shallow(<ReviewCard review={review} />);
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("To count numbers of stars tags on review card ", function () {
    try {
      wrapper = shallow(<ReviewCard review={review} />);
      let count = wrapper.find("GetStar").length;
      let div = wrapper.find("div").length;
      let card = wrapper.find("review-card-button").length;
      expect(count).toBe(1);
      expect(div).toBe(6);
      expect(card).toBe(0);
    } catch (error) {
      fail();
    }
  });

  it("Testing edit button", function () {
    //const e = { stopPropagation: jest.fn() };
    wrapper = shallow(<ReviewCard review={review} />);
    const link = wrapper.find("Button").length;

    expect(link).toBe(0);
  });

  // it("Testing the function", function () {
  //   //const e = { stopPropagation: jest.fn() };
  //   wrapper = shallow(<ReviewCard review={review} />);
  //   let object = wrapper.find("Button").at(0);
  //   object.props().handleClick({});
  // });
});
