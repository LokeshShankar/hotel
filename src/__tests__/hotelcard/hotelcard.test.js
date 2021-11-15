import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import HotelCard from "../../component/hotelcard/hotelcard";

configure({
  adapter: new Adapter(),
});

let hotelDetails = {
  hotelName: "ABC Hotel",
  hotelPrice: "1000",
  hotelCity: "Bangalore",
  hotelPincode: 123456,
  hotelRegion: "Karnataka",
  hotelAmenities: ["Amenity1", "Amenity2", "a3"],
  hotelImgSrc:
    "http://127.0.0.1:5500/coverage/23988756189e11e5bde10022195573b9.webp",
  rooms: [],
  children: [],
};

let wrapper = null;

describe("Testing HotelCard component", function () {
  // Fails beacuse of initial value for props (Array variable not initialized)
  it("Testing whether the component mounts or not without any props", function () {
    shallow(<HotelCard {...hotelDetails} />);
  });

  // Throws warning for not having unique keys in each child in the list
  it("Testing whether the component mounts or not with props", function () {
    wrapper = shallow(<HotelCard {...hotelDetails} />);
  });

  it("Testing whether the Image has correct src value", function () {
    let imgElement = wrapper.find("img").getElement();
    const expected = hotelDetails.hotelImgSrc;
    const received = imgElement.props.src;
    expect(received).toEqual(expected);
  });

  it("Testing whether the Hotel name is correct", function () {
    let hotelNameElement = wrapper.find(".hotelName").getElement();
    const expected = hotelDetails.hotelName;
    const received = hotelNameElement.props.children;
    expect(received).toEqual(expected);
  });

});
