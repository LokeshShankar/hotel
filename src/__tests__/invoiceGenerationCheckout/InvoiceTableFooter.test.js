import React from 'react'
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import InvoiceTableFooter from "../../component/invoicegenerationcheckout/InvoiceTableFooter";
import { mockInvoice } from "../../component/utility/Constant";
configure({
    adapter: new Adapter(),
  });

// const onSubmitSpy = jest.fn();
// const onSubmit = onSubmitSpy;


describe("Testing Review card Component", function () {
    it("Testing whether the object is created or not", function () {
        let wrapper;
        wrapper = shallow(<InvoiceTableFooter items={mockInvoice.items} />);
        let obj = wrapper.instance()
    })
});