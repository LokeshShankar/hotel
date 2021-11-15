import React from 'react'
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import axios from 'axios';
import { mockInvoice } from "../../component/utility/Constant";
import Invoice from "../../component/invoicegenerationcheckout/Invoice";


configure({
    adapter: new Adapter(),
  });

let wrapper;
// const onSubmitSpy = jest.fn();
// const onSubmit = onSubmitSpy;

describe("Testing Review card Component", function () {
  it("Testing whether the component mounts", function () {
    axios.get = jest.fn().mockResolvedValue({ data:mockInvoice}); 
    wrapper = shallow(<Invoice bookingId ={mockInvoice.invoice_id} history={{ push: () => {} }} />);
  });
});

//  it("Testing whether the object is created or not", function () {
//       try {
//         wrapper = shallow(<Invoice bookingId={bookingId}/>);
//         let obj = wrapper.instance();
//       } catch (error) {
//         fail();
//       }
//     });