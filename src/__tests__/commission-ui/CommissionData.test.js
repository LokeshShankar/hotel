import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import CommissionData from "../../component/commission-ui/CommissionData"

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

  describe("Testing CommissionData Component", function () {
    it("Testing whether the object is created or not", function () {
      try {
        wrapper = shallow(<CommissionData commission={commission} month={"February"} year={2021}/>)
        let obj = wrapper.instance();
      } catch (error) {
        fail();
      }
    });
  
    it('testing comissiondata head', () => {
        wrapper = shallow(<CommissionData commission={commission} month={"February"} year={2021}/>);
      const title = <div className="--form-card-publicis-header">Commission Invoice</div>;
      expect(wrapper.contains(title)).toEqual(true);
    });
  
    it('testing count of div tag', () => {
      wrapper = shallow(<CommissionData commission={commission} month={"February"} year={2021}/>);
      const count = wrapper.find('div').length
      expect(count).toBe(16);
    });
  
    it('testing count of span tag', () => {
        wrapper = shallow(<CommissionData commission={commission} month={"February"} year={2021}/>);
        const count = wrapper.find('span').length
        expect(count).toBe(7);
      });

      it('testing count of h3 tag', () => {
        wrapper = shallow(<CommissionData commission={null} month={"February"} year={2021}/>);
        const count = wrapper.find('h3').length
        expect(count).toBe(1);
      });
  });
  