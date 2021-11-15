import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import ResultCardList from "../../component/searchresultspage/resultcardlist";

configure({
  adapter: new Adapter(),
});

let hotels = [
  {
    hotel_id: "h001",
    hotelName: "ABC Hotel",
    hotelPrice: "1000",
    hotelCity: "Bangalore",
    hotelPincode: 123456,
    hotelRegion: "Karnataka",
    amenities: ["Amenity1", "Amenity2"],
    hotelImages: [],
  },
  {
    hotel_id: "h002",
    hotelName: "ABC Hotel",
    hotelPrice: "1000",
    hotelCity: "Bangalore",
    hotelPincode: 123456,
    hotelRegion: "Karnataka",
    amenities: ["Amenity1", "Amenity2"],
    hotelImages: ["/hotel.webp"],
  },
];

let wrapper = null;

describe("Testing ResultCardList component", function () {
  // Fails beacuse of initial value for props (Array variable not initialized)
  it("Testing whether the component mounts or not without any props", function () {
    shallow(<ResultCardList />);
  });

  // Throws warning for not having unique keys in each child in the list
  it("Testing whether the component mounts or not with props", function () {
    wrapper = shallow(<ResultCardList results={hotels} />);
    const expected = hotels.length;
    const received = wrapper.find("HotelCard").length;
    expect(received).toBe(expected);
  });
});
