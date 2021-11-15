import React from 'react'
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import InvoiceTableHeader from "../../component/invoicegenerationcheckout/InvoiceTableHeader"
import { mockInvoice } from "../../component/utility/Constant";
configure({
    adapter: new Adapter(),
  });

let wrapper;
// const onSubmitSpy = jest.fn();
// const onSubmit = onSubmitSpy;


describe("Testing Review card Component", function () {
    it("Testing whether the object is created or not", function () {
      try {
        wrapper = shallow(<InvoiceTableHeader />
            );
        let obj = wrapper.instance();
      } catch (error) {
        fail();
      }
    });
});