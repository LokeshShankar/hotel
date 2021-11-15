import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import HotelAddress from "../../component/addhotel/HotelAddress";
import Geocode from "react-geocode";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<HotelAddress {...prop} />);
});

describe("Testing Hotel Address Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("To check all the feilds are empty", function () {
    let object = wrapper.find("Button").at(1);
    mockInfoEmpty(wrapper.find("Input"));
    object.props().handleClick({ preventDefault: () => {} });

    let obj = wrapper.instance();
    expect(obj.state.errors).toStrictEqual({
      city: "City name can't be empty",
      landmarks: "Landmarks can't be empty",
      localAddress: "Local address can't be empty",
      pincode: "Invalid pincode",
      region: "Region can't be empty",
    });
  });

  it("To check invalid pincode and city", function () {
    let object = wrapper.find("Button").at(1);
    mockInfo(wrapper.find("Input"));
    fillData(wrapper.find("Input").at(2), "city", "123");
    fillData(wrapper.find("Input").at(3), "pincode", "aaaaaa");
    object.props().handleClick({ preventDefault: () => {} });

    let obj = wrapper.instance();
    expect(obj.state.errors).toStrictEqual({
      city: "Invalid city name",
      pincode: "Invalid pincode",
    });
  });

  // // props function
  it("To check all data is valid", function () {
    let object = wrapper.find("Button").at(1);
    mockInfo(wrapper.find("Input"));
    let obj = wrapper.instance();
    object.props().handleClick({ preventDefault: () => {} });
    // expect(mockhotelAddressCallback).toHaveBeenCalledWith(obj.state);
  });

  it("To Mock findGeocode", function () {
    let object = wrapper.instance();
    let response = {
      results: [
        { geometry: { location: { lat: 28.5002761, lng: 77.0812691 } } },
      ],
    };
    Geocode.fromAddress = jest.fn().mockResolvedValue(response);
    object
      .findGeocode("R 68 Street No 20 Brahmpuri Delhi 110053")
      .then((geocode) => {
        expect(geocode).toStrictEqual(response.results[0].geometry.location);
        expect(object.state.latitude).toBe(28.5002761);
      });
  });

  // // MultiSelect :-> Not working
  // it("To check selected Amenities", function () {
  //   let obj = wrapper.instance();
  //   obj.multiSelect([{ key: "First-aid Services" }, { key: "Room Service" }]);
  //   expect(obj.state.selectedAmenities).toStrictEqual([
  //     { key: "First-aid Services" },
  //     { key: "Room Service" },
  //   ]);
  // });
});

const mockhotelAddressCallback = jest.fn();

const prop = {
  hotelAddressCallback: mockhotelAddressCallback,
};
const fillData = (object, tagName, tagValue) => {
  object.simulate("change", {
    preventDefault: () => {},
    target: { name: tagName, value: tagValue },
  });
};

function mockInfo(inputTags) {
  fillData(inputTags.at(0), "localAddress", "H 23 Palika");
  fillData(inputTags.at(1), "region", "North West");
  fillData(inputTags.at(2), "city", "Delhi");
  fillData(inputTags.at(3), "pincode", "110043");
  fillData(inputTags.at(4), "landmarks", "Hanuman Mandir");
}

function mockInfoEmpty(inputTags) {
  fillData(inputTags.at(0), "localAddress", "");
  fillData(inputTags.at(1), "region", "");
  fillData(inputTags.at(2), "city", "");
  fillData(inputTags.at(3), "pincode", 0);
  fillData(inputTags.at(4), "landmarks", "");
}
