import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import HotelCardsList from "../../component/viewhotelsadmin/HotelCardsList";

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
    amenities: "Amenity1 , Amenity2",
    hotelImages:
    ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8&amp;ixlib=rb-1.2.1&amp;w=1000&amp;q=80"],
      hotelVisibility:false,
      rooms:[{roomPrice:1000},{roomPrice:5000}]
  },
  {
    hotel_id: "h002",
    hotelName: "ABC Hotel",
    hotelPrice: "1000",
    hotelCity: "Bangalore",
    hotelPincode: 123456,
    hotelRegion: "Karnataka",
    amenities: "Amenity1 , Amenity2",
    hotelImages:
    ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8&amp;ixlib=rb-1.2.1&amp;w=1000&amp;q=80"],
      hotelVisibility:false,
      rooms:[{roomPrice:1000},{roomPrice:5000}]
  },
];

let wrapper = null;

describe("Testing ResultCardList component", function () {
  

  // Throws warning for not having unique keys in each child in the list
  it("Testing whether the component mounts or not with props", function () {
    wrapper = shallow(<HotelCardsList results={hotels} />);
    const expected = hotels.length;
    const received = wrapper.find("HotelCardAdmin").length;
    expect(received).toBe(expected);
  });
});
