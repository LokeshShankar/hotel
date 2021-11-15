import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import DisplayCommission from "../../component/commission-ui/DisplayCommission"
import axios from "axios";

configure({
    adapter: new Adapter(),
  });
  
let wrapper;
let commission = {
    "bookingCount": 6,
    "bookingAmount": 39600,
    "hotelId": 14,
    "hotelName": "Sherdon Hotel",
    "hotelEmail": "sherdon@hotel.com",
    "hotelPhone": "9587462345",
    "hotelLocalAddress": "Packet 12",
    "hotelRegion": "Cyber city",
    "hotelLandmarks": "DLF Metro",
    "hotelCity": "Delhi",
    "hotelPincode": "110078"
};

beforeEach(() => {
  axios.get = jest.fn().mockResolvedValue({ data:commission}); 
  wrapper = shallow(<DisplayCommission location={{state: {hotelId: 13}}} history={{ push: () => {} }}/>);  
});

describe("Testing DisplayCommission Component", function () {
    
    it("Testing whether the object is created or not", function () {
        let obj = wrapper.instance();
    });

    it('testing count of div tag', () => {
        const count = wrapper.find('div').length
        expect(count).toBe(2);
    });

    it('testing count of span tag', () => {
        const count = wrapper.find('span').length
        expect(count).toBe(3);
    });

    it("Testing the handle click func", function () {
        let buttonWrapper = wrapper.find('input[value="SEARCH"]');
        let yearWrapper = wrapper.find('#yeardrop');
        let monthWrapper = wrapper.find('#monthdrop');
        
          yearWrapper.simulate("change", {
            target: { value:2021},
          });
          monthWrapper.simulate("change", {
            target: { value:"June"},
          });
          
        buttonWrapper.simulate('click', { preventDefault: () => {} })
    });

    it("Testing the handle click func", function () {
      let buttonWrapper = wrapper.find('input[value="SEARCH"]');
      let yearWrapper = wrapper.find('#yeardrop');  
        yearWrapper.simulate("change", {
          target: { value:2018},
        });
      buttonWrapper.simulate('click', { preventDefault: () => {} });
  });

  it("Testing the handle click func", function () {
    let buttonWrapper = wrapper.find('input[value="SEARCH"]');
    let monthWrapper = wrapper.find('#monthdrop');  
      monthWrapper.simulate("change", {
        target: { value:"June"},
      });
    buttonWrapper.simulate('click', { preventDefault: () => {} });
});

    it("Testing the handle click func", function () {
        let buttonWrapper = wrapper.find('input[value="SEARCH"]');
        global.alert = jest.fn();
        buttonWrapper.simulate('click', { preventDefault: () => {} });
    });
});
  