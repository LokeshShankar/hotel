import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Timer from "../../component/login/Timer";
import axios from "axios";
configure({
  adapter: new Adapter(),
});
let wrapper;
beforeEach(() => {
    wrapper = shallow(
      <Timer startCount='60' />
    );
});
describe("Testing Bill Entry Component", function () {
    it("Testing whether the object is created or not", function () {
        try {
          let obj = wrapper.instance();
        } catch (error) {
          fail();
        }
      });
      
});