import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { mockInvoice } from "../../component/utility/Constant";
import RoomsItemsTable from "../../component/invoicegenerationcheckout/RoomsItemsTable";

configure({
  adapter: new Adapter(),
});

let wrapper;

describe("Testing RoomsItemsDetails Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      wrapper = shallow(<RoomsItemsTable invoice={mockInvoice} />);
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
});
