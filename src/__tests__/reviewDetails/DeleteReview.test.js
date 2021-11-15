import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import * as reactModule from "react";
import Button from "../../component/utility/Button";
import axios from "axios";
import DeleteReview from "../../component/reviewDetails/DeleteReview";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  //wrapper = shallow(<Form flagchange={{ push: () => {} }} hotelid={"14"} />);
});

describe("Testing Form  Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      wrapper = shallow(<DeleteReview flagchange={{ push: () => {} }} />);
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("testing form head", () => {
    const wrapper = shallow(<DeleteReview />);
    const title = (
      <div className="--form-card-publicis-header">
        Are you sure you want to Delete Review?
      </div>
    );
    expect(wrapper.contains(title)).toEqual(true);
  });

  it("testing count of  tag", () => {
    const wrapper = shallow(<DeleteReview />);
    const div = wrapper.find("div").length;
    expect(div).toBe(4);
    const input = wrapper.find("Button").length;
    expect(input).toBe(2);
    const form = wrapper.find("form").length;
    expect(form).toBe(1);
  });

  it("testing form button", () => {
    const wrapper = shallow(<DeleteReview />);
    const title = (
      <Button cssClassName="btn--publicis-primary admin-button"></Button>
    );
    expect(wrapper.contains(title)).toEqual(false);
  });

  // it("Testing NO button", function () {
  //   const e = { stopPropagation: jest.fn() };
  //   wrapper = shallow(<DeleteReview flagchange={{ flagchange: () => {} }} />);
  //   const link = wrapper.find("Button").at(1);
  //   link.props().handleClick(e);
  // });

  it("Testing whether the component mounts", function () {
    axios.delete = jest.fn().mockResolvedValue({});
    wrapper = shallow(
      <DeleteReview flagchange={{ flagchange: () => {} }} reviewId={1} />
    );
  });

  it("To check for the DeleteReview", async function () {
    axios.delete = jest.fn();
    await axios.delete.mockImplementationOnce(() =>
      Promise.resolve({ data: "delete form" })
    );
    const events = {
      preventDefault: () => {},
    };
    let object = wrapper.find("Button").at(0);
    //let inputTags = wrapper.find("Input");
    //mockInfoToForm(inputTags);
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
