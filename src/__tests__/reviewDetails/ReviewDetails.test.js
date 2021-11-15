import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import ReviewDetails from "../../component/reviewDetails/ReviewDetails";
import * as reactModule from "react";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<ReviewDetails />);
});

describe("Testing Review card Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("testing review head", () => {
    const wrapper = shallow(<ReviewDetails />);
    const title = <h4 className="review-head">Hotel Reviews and Ratings</h4>;
    expect(wrapper.contains(title)).toEqual(true);
  });

  it("testing count of h2 tag", () => {
    const wrapper = shallow(<ReviewDetails />);
    const count = wrapper.find("h4").length;
    expect(count).toBe(1);
  });

  it("testing add review button", () => {
    const wrapper = shallow(<ReviewDetails hotelid={14} />);
    const title = (
      <button
        type="button"
        onClick={(event) => {
          setFlag(1);
        }}
        className="btn--publicis-primary button1"
      >
        + Add Review
      </button>
    );
    expect(wrapper.contains(title)).toEqual(false);
  });
});
