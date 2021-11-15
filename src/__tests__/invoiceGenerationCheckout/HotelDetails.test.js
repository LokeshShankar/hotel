import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { mockInvoice } from "../../component/utility/Constant";
import HotelDetails from "../../component/invoicegenerationcheckout/HotelDetails";

configure({
  adapter: new Adapter(),
});

let wrapper;

describe("Testing of Hotel Details Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      wrapper = shallow(<HotelDetails invoice={mockInvoice} />);
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
});
