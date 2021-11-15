import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import "../../setupTests";
import { Input } from "../../component/utility/Input";
import SearchBar from "../../component/search/SearchBar";
import UserLandingPage from "../../component/userlandingpage/userlandingpage";
configure({
  adapter: new Adapter(),
});
describe("Testing Input component", function () {
  it("Testing whether the component is mount or not", function () {
    try {
      const wrapper1 = shallow(<UserLandingPage></UserLandingPage>);
      let obj2 = wrapper1.instance();
      const wrapper = shallow(
        <Input name="username" onChange={obj2.setData} />
      );
      let object = wrapper.instance();
    } catch (error) {
      //            console.log(error)
      fail();
    }
  });
  it("Testing no. of input tag", function () {
    try {
      const wrapper1 = shallow(<UserLandingPage></UserLandingPage>);
      let obj2 = wrapper1.instance();
      const wrapper = shallow(
        <Input name="username" onChange={obj2.setData} />
      );
      let object = wrapper.instance();
      let len = wrapper.find("input").length;
      expect(len).toBe(1);
    } catch (error) {
      //            console.log(error)
      fail();
    }
  });
  it("Testing no. of label tag", function () {
    try {
      const wrapper1 = shallow(<UserLandingPage></UserLandingPage>);
      let obj2 = wrapper1.instance();
      const wrapper = shallow(
        <Input name="username" onChange={obj2.setData} />
      );
      let object = wrapper.instance();
      let len = wrapper.find("label").length;
      expect(len).toBe(1);
    } catch (error) {
      //            console.log(error)
      fail();
    }
  });
});
