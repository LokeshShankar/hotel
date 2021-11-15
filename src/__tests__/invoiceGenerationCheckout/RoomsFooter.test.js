import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { mockInvoice } from "../../component/utility/Constant";
import RoomsFooter from "../../component/invoicegenerationcheckout/RoomsFooter";

configure({
  adapter: new Adapter(),
});

let wrapper;

describe("Testing Rooms Footer Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      wrapper = shallow(<RoomsFooter invoice={mockInvoice} />);
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
});
