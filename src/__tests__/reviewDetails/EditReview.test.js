import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import * as reactModule from "react";
import Button from "../../component/utility/Button";
import axios from "axios";
import EditReview from "../../component/reviewDetails/EditReview";
import obj from "../../component/reviewDetails/EditReview";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(
    <EditReview flagchange={{ push: () => {} }} review={review} />
  );
});

describe("Testing Form  Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      wrapper = shallow(
        <EditReview flagchange={{ push: () => {} }} review={review} />
      );
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("testing form head", () => {
    const wrapper = shallow(<EditReview review={review} />);
    const title = (
      <div className="--form-card-publicis-header">Edit your Review </div>
    );
    expect(wrapper.contains(title)).toEqual(true);
  });

  it("testing count of  tag", () => {
    const wrapper = shallow(<EditReview review={review} />);
    const div = wrapper.find("div").length;
    expect(div).toBe(4);
    const input = wrapper.find("Input").length;
    expect(input).toBe(2);
    const form = wrapper.find("form").length;
    expect(form).toBe(1);
  });

  it("testing form button", () => {
    const wrapper = shallow(<EditReview review={review} />);
    const title = (
      <Button
        cssClassName="btn--publicis-primary admin-button"
        label="Submit Review"
      ></Button>
    );
    expect(wrapper.contains(title)).toEqual(false);
  });

  it("Testing whether the component mounts", function () {
    axios.put = jest.fn().mockResolvedValue({});
    wrapper = shallow(
      <EditReview flagchange={{ flagchange: () => {} }} review={review} />
    );
  });

  it("Testing edit button", function () {
    const e = { stopPropagation: jest.fn() };
    wrapper = shallow(
      <EditReview flagchange={{ flagchange: () => {} }} review={review} />
    );
    const link = wrapper.find("Button");
    link.props().handleClick(e);
    expect(Object.entries(obj).length).toBe(0);
  });

  it("To check for the EditReview", async function () {
    axios.put = jest.fn();
    await axios.put.mockImplementationOnce(() =>
      Promise.resolve({ data: "editing form" })
    );
    const events = {
      preventDefault: () => {},
    };
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    mockInfoToForm(inputTags);
    let obj = wrapper.instance();
    // console.log(obj.state)
    object.props().handleClick({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
    //expect(obj.state.response).toEqual("adding form");
  });
});

const fillDataInForm = (object, tagName, tagValue) => {
  object.simulate("change", {
    preventDefault: () => {},
    target: { name: tagName, value: tagValue },
  });
};

function mockInfoToForm(inputTags) {
  fillDataInForm(inputTags.at(0), "review", "achi thi");
  fillDataInForm(inputTags.at(1), "rating", "4");
}

let review = {
  reviewId: 1,
  review: "heya",
  rating: 4.5,
};
