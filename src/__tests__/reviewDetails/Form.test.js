import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Form from "../../component/reviewDetails/Form";
import * as reactModule from "react";
import Button from "../../component/utility/Button";
import axios from "axios";
import obj from "../../component/reviewDetails/Form";

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
      wrapper = shallow(
        <Form flagchange={{ push: () => {} }} hotelid={"14"} />
      );
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("testing form head", () => {
    const wrapper = shallow(<Form />);
    const title = <div className="--form-card-publicis-header">Review </div>;
    expect(wrapper.contains(title)).toEqual(true);
  });

  it("testing count of  tag", () => {
    const wrapper = shallow(<Form />);
    const div = wrapper.find("div").length;
    expect(div).toBe(4);
    const input = wrapper.find("Input").length;
    expect(input).toBe(2);
    const form = wrapper.find("form").length;
    expect(form).toBe(1);
  });

  it("testing form button", () => {
    const wrapper = shallow(<Form hotelid={14} />);
    const title = (
      <Button
        cssClassName="btn--publicis-primary admin-button"
        label="Add Review"
      ></Button>
    );
    expect(wrapper.contains(title)).toEqual(false);
  });

  it("Testing whether the component mounts", function () {
    axios.post = jest.fn().mockResolvedValue({});
    wrapper = shallow(
      <Form flagchange={{ flagchange: () => {} }} hotelid={"14"} />
    );
  });

  it("Testing add button", function () {
    const e = { stopPropagation: jest.fn() };
    wrapper = shallow(
      <Form flagchange={{ flagchange: () => {} }} hotelid={"14"} />
    );
    const link = wrapper.find("Button");
    link.props().handleClick(e);
    expect(Object.entries(obj).length).toBe(0);
  });

  it("To check for the Form", async function () {
    axios.post = jest.fn();
    await axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: "adding form" })
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
