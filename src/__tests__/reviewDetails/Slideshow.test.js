import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
import Slideshow from "../../component/reviewDetails/Slideshow";
configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
   wrapper = shallow(<Slideshow images={[]}/>);
 });

describe("Testing review details Component", function () {
  it("Testing whether the object is created or not", function () {
    wrapper = shallow(<Slideshow images={[]}/>);

  });

  it("To count numbers of tags on Slide Show Component", function () {
    try {
      
      let count_div = wrapper.find("div").length;
      expect(count_div).toBe(2);
    } catch (error) {
      fail();
    }
     
    
  });
});