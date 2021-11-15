import React from "react";
import {render} from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import Button from "../../component/utility/Button";
import { shallow, configure } from "enzyme";
import RoomAvailabilityPage from "../../component/roomavailability/roomavailabilitypage";
import RoomTypeDetailCard from "../../component/roomavailability/RoomTypeDetailCard";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<RoomAvailabilityPage {...roomDetailsProp} history={{ push: () => {} }}/>);
});

describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    //   let obj = wrapper.instance();
    try {
      wrapper = shallow(<roomAvailabilityPage {...roomDetailsProp} />);
    } catch (error) {
      fail();
    }
  });

  it("Check initial count of RoomTypeDetailCard component", function () {
    let count1 = wrapper.find(RoomTypeDetailCard).length;
    expect(count1).toBe(2);
    
  });

  it("Testing Continue to booking page button", function () {
    let buttonWrapper = wrapper.find('Button[label="Continue to Book"]');
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    
});

it("Check number of Buttons on roomavailabilitypage", () => {
  let noOfButtons = wrapper.find(Button).length;
  expect(noOfButtons).toBe(1);
});

// it("Testing Continue to booking page button", function () {
//   const wrapper = shallow(<roomAvailabilityPage {...roomDetailsProp} />);
//     expect(wrapper.containsMatchingElement(<div className="continue-btn">
//     <Button
//       cssClassName="btn--publicis-success continue_book_btn"
//       label="Continue to Book"
//       handleClick={this.booking}
//     ></Button>
//   </div>)).toEqual(true);
  
// });




// it("testing if RoomTypeDetailCard component is being rendered", function() {
//   // given
//   const wrapper = shallow(<roomAvailabilityPage {...roomDetailsProp} />);
//     expect(wrapper.containsMatchingElement(<roomTypeDetailCard {...roomDetailsProp}/>)).toEqual(true);
// });

  


  

    // it("Mock Room SelectCallBack ", () => {
    //     let obj = wrapper.instance();
    //     let event = {
    //       target: { value: "Hello" },
    //     };
    //     obj.onTrigger(event);
    //     expect(mockSelectCallBack).toHaveBeenCalledWith("Hello");
    //   });

  // it("Testing whether the ChangePassword component is mount or not", function () {
  //     try {
  //       const wrapper = shallow(<ChangePassword_></ChangePassword_>);
  //     } catch (error) {
  //       fail();
  //     }
});

let roomDetailsProp = {
  searchState: {
    startDate: "",
    endDate: "",
  },
  hotel: {
    rooms: [
      {
        roomTypeName: "Deluxe",
        roomCapacity: 3,
        totalRoomCount: 2,
        roomPrice: 5000,
        inclusions: "Free Wifi,Free Breakfast",
      },
      {
        roomTypeName: "Deluxe",
        roomCapacity: 3,
        totalRoomCount: 2,
        roomPrice: 5000,
        inclusions: "Free Wifi,Free Breakfast,alcohol",
      },
    ],

    hotel_id: 1012,
  },
};

//   roomDetails: {
//     roomType: "Deluxe",
//     maxPersons: 3,
//     roomCount: 2,
//     roomPrice: 5000,
//     roomInclusions: ["Free Wifi", "Free Breakfast"],
//   },
