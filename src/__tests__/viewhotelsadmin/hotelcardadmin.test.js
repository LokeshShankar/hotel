import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import HotelCardAdmin from "../../component/viewhotelsadmin/HotelCardAdmin";

configure({
  adapter: new Adapter(),
});

let hotelDetails = {
  hotelImgSrc:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8&amp;ixlib=rb-1.2.1&amp;w=1000&amp;q=80",
  hotelid: 1,
  hotelName: "ABC Hotel",
  hotelPrice: "1000",
  hotelCity: "Bangalore",
  hotelPincode: 123456,
  hotelRegion: "Karnataka",
  hotelAmenities: "Amenity1, Amenity2",
  hotelVisibility: true,
};

let wrapper = null;

describe("Testing HotelCardAdmin component", function () {
  it("Testing whether the component mounts or not without any props", function () {
    try {
      const wrapper = shallow(
        <HotelCardAdmin hotelAmenities={hotelDetails.hotelAmenities} />
      );
      let obj = wrapper.instance();
    } catch (error) {
      //      console.log(error);
      fail();
    }
  });

  it("Testing whether the component mounts or not with props", function () {
    wrapper = shallow(<HotelCardAdmin {...hotelDetails} />);
  });

  it("Testing whether the Image has correct src value", function () {
    let imgElement = wrapper.find("img").getElement();
    const expected = hotelDetails.hotelImgSrc;
    const received = imgElement.props.src;
    expect(received).toEqual(expected);
  });

  it("Testing whether the Hotel name is correct", function () {
    let hotelNameElement = wrapper.find(".hotelNameAdmin").getElement();
    const expected = hotelDetails.hotelName;
    const received = hotelNameElement.props.children;
    expect(received).toEqual(expected);
  });

  xit("Testing whether the Hotel location is correct", function () {
    let hotelLocationElement = wrapper
      .find(".infoBodyLocationAdmin")
      .getElement();
    let hotelLocationTextArray = [...hotelLocationElement.props.children];
    hotelLocationTextArray[1] = hotelLocationTextArray[5] = "br"; // <br> is present at this indices in the array, so changing it to string br
    const expected = [
      "Location:",
      "br",
      hotelDetails.hotelCity,
      " - ",
      hotelDetails.hotelPincode,
      "br",
      <br />,
      hotelDetails.hotelRegion,
    ];
    const received = hotelLocationTextArray;
    expect(received).toEqual(expected); // Compare both as Strings
  });

  // it("Testing whether the Hotel amenities is correct", function () {
  //   let hotelAmenitiesElement = wrapper.find(".infoBodyAmenitiesAdmin").getElement();
  //   let hotelAmenitiesListElement = [...hotelAmenitiesElement.props.children];
  //   expect(hotelAmenitiesListElement[0]).toEqual("Hotel Amenities:");
  //   const expected = hotelDetails.hotelAmenities.split(',').map((amenity) => {
  //     return `<li>${amenity}</li>`;
  //   });
  //   const received = hotelAmenitiesListElement[1].props.children.map(
  //     (liElement) => {
  //       return `<li>${liElement.props.children}</li>`;
  //     }
  //   );
  //   expect(received).toEqual(expected); // Compare both as Strings
  // });
});
