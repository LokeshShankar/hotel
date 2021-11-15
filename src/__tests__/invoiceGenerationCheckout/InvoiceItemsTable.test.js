import React from 'react'
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { mockInvoice } from "../../component/utility/Constant";
import InvoiceItemsTable from "../../component/invoicegenerationcheckout/InvoiceItemsTable";

configure({
    adapter: new Adapter(),
  });

let wrapper;
// const onSubmitSpy = jest.fn();
// const onSubmit = onSubmitSpy;


describe("Testing Review card Component", function () {
    it("Testing whether the object is created or not", function () {
      try {
        wrapper = shallow(<InvoiceItemsTable invoice={mockInvoice} />);
        let obj = wrapper.instance();
      } catch (error) {
        fail();
      }
    });
});