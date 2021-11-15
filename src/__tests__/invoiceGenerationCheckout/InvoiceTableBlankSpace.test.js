import React from 'react'
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import InvoiceTableBlankSpace from "../../component/invoicegenerationcheckout/InvoiceTableBlankSpace";
import { mockInvoice } from "../../component/utility/Constant";
configure({
    adapter: new Adapter(),
  });



let wrapper;
// const onSubmitSpy = jest.fn();
// const onSubmit = onSubmitSpy;
let tableRowsCount=11;
let itemslength=5

describe("Testing Review card Component", function () {
    it("Testing whether the object is created or not", function () {
      try {
        wrapper = shallow(<InvoiceTableBlankSpace rowsCount={ tableRowsCount - itemslength} />);
        let obj = wrapper.instance();
      } catch (error) {
        fail();
      }
    });
});