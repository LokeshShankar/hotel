import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import UserLandingPage from "../../component/userlandingpage/userlandingpage";
import axios from "axios";
import logger from "../../logger";
import { LOCATIONS } from "../../component/utility/Constant";

configure({
  adapter: new Adapter(),
});

let hotels = [
  {
    hotel_id: "h001",
    hotelName: "Hotel 1",
    phone: "ph1",
    email: "e1",
    checkInTime: "2022-02-23",
    checkOutTime: "2022-02-25",
    taxRate: 3,
    localAddress: "la1",
    region: "Karnataka",
    importantLandmarks: ["il1", "il2"],
    city: "Bangalore",
    pincode: 123456,
    coordinates: null,
    rooms: [
      {
        roomTypeName: "General",
        roomCapacity: 2,
        totalRoomCount: 15,
        roomPrice: 100,
        roomInclusions: [1, 2],
      },
      {
        roomTypeName: "Deluxe",
        roomCapacity: 2,
        totalRoomCount: 5,
        roomPrice: 5000,
        roomInclusions: [1, 2],
      },
    ],
    amenities: "First-aid Services,Dining Area",
    rating: 3.5,
    hotelImages: [
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
    ],
  },
  {
    hotel_id: "h002",
    hotelName: "Hotel 2",
    phone: "ph1",
    email: "e1",
    checkInTime: "2022-02-23",
    checkOutTime: "2022-02-25",
    taxRate: 3,
    localAddress: "la1",
    region: "Karnataka",
    importantLandmarks: ["il1", "il2"],
    city: "Bangalore",
    pincode: 123456,
    coordinates: null,
    rooms: [
      {
        roomTypeName: "General",
        roomCapacity: 2,
        totalRoomCount: 10,
        roomPrice: 100,
        roomInclusions: [1, 2],
      },
      {
        roomTypeName: "Super Deluxe",
        roomCapacity: 2,
        totalRoomCount: 5,
        roomPrice: 5000,
        roomInclusions: [1, 2],
      },
    ],
    amenities: "Room Service,Dining Area",
    rating: 1.5,
    hotelImages: [
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
    ],
  },
  {
    hotel_id: "h003",
    hotelName: "Hotel 3",
    phone: "ph1",
    email: "e1",
    checkInTime: "2022-02-23",
    checkOutTime: "2022-02-25",
    taxRate: 3,
    localAddress: "la1",
    region: "Karnataka",
    importantLandmarks: ["il1", "il2"],
    city: "Bangalore",
    pincode: 123456,
    coordinates: null,
    rooms: [
      {
        roomTypeName: "Deluxe",
        roomCapacity: 2,
        totalRoomCount: 5,
        roomPrice: 1000,
        roomInclusions: [1, 2],
      },
      {
        roomTypeName: "Super Deluxe",
        roomCapacity: 2,
        totalRoomCount: 2,
        roomPrice: 5000,
        roomInclusions: [1, 2],
      },
    ],
    amenities: "First-aid Services,Health-Spa,Lounge",
    rating: 4.5,
    hotelImages: [
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
    ],
  },
  {
    hotel_id: "h004",
    hotelName: "Hotel 4",
    phone: "ph1",
    email: "e1",
    checkInTime: "2022-02-23",
    checkOutTime: "2022-02-25",
    taxRate: 3,
    localAddress: "la1",
    region: "Karnataka",
    importantLandmarks: ["il1", "il2"],
    city: "Bangalore",
    pincode: 123456,
    coordinates: null,
    rooms: [
      {
        roomTypeName: "General",
        roomCapacity: 2,
        totalRoomCount: 10,
        roomPrice: 200,
        roomInclusions: [1, 2],
      },
    ],
    amenities: "Restaurant/Coffee Shop",
    rating: 2.5,
    hotelImages: [
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
    ],
  },
];

let hotelsExpected = [];
let locationIndex = 2;
let durationOfStay = 2; // Number of days for hotel stay
let search = {
  location: LOCATIONS[locationIndex].label,
  startDate: getDateAfterDays(),
  endDate: getDateAfterDays(durationOfStay),
  adults: 5,
  children: 3,
  rooms: 2,
};

let wrapper = null;
let searchBarWrapper = null;

describe("Testing UserLandingPage component", function () {
  it("Testing whether the component mounts", function () {
    axios.get = jest.fn().mockResolvedValue({ data: hotels }); // Mock Data for axios call
    wrapper = shallow(<UserLandingPage history={{ push: () => {} }} />);
    hotelsExpected = hotels.map((hotel) => {
      return {
        ...hotel,
        amenities: hotel.amenities.split(","),
      };
    });
  });

  // Response Data will be mocked after API call is added
  it("Testing state after mounting", function () {
    let obj = wrapper.instance();
    expect(obj.state.results).toEqual(hotelsExpected); // Compare both as Strings
  });

  it("Testing set state", async function () {
    let obj = wrapper.instance();
    let hotel = {
      hotel_id: "h005",
      hotelName: "Hotel 5",
      phone: "ph1",
      email: "e1",
      checkInTime: "2022-02-23",
      checkOutTime: "2022-02-25",
      taxRate: 3,
      localAddress: "la1",
      region: "Karnataka",
      importantLandmarks: ["il1", "il2"],
      city: "Bangalore",
      pincode: 123456,
      coordinates: null,
      rooms: [
        {
          roomTypeName: "General",
          roomCapacity: 2,
          totalRoomCount: 5,
          roomPrice: 800,
          roomInclusions: [1, 2],
        },
        {
          roomTypeName: "Deluxe",
          roomCapacity: 2,
          totalRoomCount: 3,
          roomPrice: 2000,
          roomInclusions: [1, 2],
        },
      ],
      amenities: ["Room Service", "Restaurant/Coffee Shop"],
      rating: 4.2,
      hotelImages: [
        "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
      ],
    };
    hotels.push(hotel);
    hotelsExpected.push(hotel);
    obj.setState({ results: hotelsExpected });
    obj = await wrapper.instance();
    const expected = hotelsExpected;
    const received = obj.state.results;
    expect(received).toEqual(expected);
  });

  // If this test fails, all the successive tests will also fail
  it("Testing whether SearchBar component mounted or not", function () {
    searchBarWrapper = wrapper.find("SearchBar").dive();
  });

  it("Testing search button click without search state in SearchBar component", function () {
    let buttonWrapper = searchBarWrapper.find('Button[label="SEARCH"]');
    window.alert = jest.fn(); // Mock Function
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    const expected = "Please fill in all search inputs";
    expect(window.alert).toHaveBeenCalledWith(expected);
  });

  it("Testing location input in SearchBar component", function () {
    let locationSelecttWrapper = searchBarWrapper.find("#searchLocationFilter");

    let obj = wrapper.instance();
    const event = {
      label: search.location,
    };
    locationSelecttWrapper.props().onChange(event);
    const expected = search.location;
    const received = obj.state.searchState.location;
    expect(received).toEqual(expected);
  });

  it("Testing check in date input in SearchBar component initially", function () {
    let checkInInputWrapper = searchBarWrapper.find('Input[name="startDate"]');
    checkInInputWrapper.simulate("change", {
      target: { name: "startDate", value: "2021-08-01" },
    });
    var today = new Date();
    let obj = wrapper.instance();
    const expected = today.toISOString().substr(0, 10);
    const received = obj.state.searchState.startDate;
    expect(received).toEqual(expected);
  });

  it("Testing check out date input in SearchBar component initially", function () {
    let checkOutInputWrapper = searchBarWrapper.find('Input[name="endDate"]');
    checkOutInputWrapper.simulate("change", {
      target: { name: "endDate", value: "2021-08-01" },
    });
    let obj = wrapper.instance();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const expected = tomorrow.toISOString().substr(0, 10);
    const received = obj.state.searchState.endDate;
    expect(received).toEqual(expected);
  });

  it("Testing check in date input in SearchBar component check", function () {
    let checkInInputWrapper = searchBarWrapper.find('Input[name="startDate"]');
    var today = new Date();
    today.setDate(today.getDate() + 1);
    var checkindate = today.toISOString().substr(0, 10);
    today.setDate(today.getDate() + 1);
    checkInInputWrapper.simulate("change", {
      target: { name: "startDate", value: checkindate },
    });
    let obj = wrapper.instance();
    const expected = checkindate;
    const received = obj.state.searchState.startDate;
    expect(received).toEqual(expected);
  });

  it("Testing check in date input in SearchBar component", function () {
    let checkInInputWrapper = searchBarWrapper.find('Input[name="startDate"]');
    checkInInputWrapper.simulate("change", {
      target: { name: "startDate", value: search.startDate },
    });
    let obj = wrapper.instance();
    const expected = search.startDate;
    const received = obj.state.searchState.startDate;
    expect(received).toEqual(expected);
  });

  it("Testing check out date input in SearchBar component", function () {
    let checkOutInputWrapper = searchBarWrapper.find('Input[name="endDate"]');
    checkOutInputWrapper.simulate("change", {
      target: { name: "endDate", value: search.endDate },
    });
    let obj = wrapper.instance();
    const expected = search.endDate;
    const received = obj.state.searchState.endDate;
    expect(received).toEqual(expected);
  });

  it("Testing adults input in SearchBar component", function () {
    let adultsInputWrapper = searchBarWrapper.find('Input[name="adults"]');
    adultsInputWrapper.simulate("change", {
      target: { name: "adults", value: search.adults },
    });
    let obj = wrapper.instance();
    const expected = search.adults;
    const received = obj.state.searchState.adults;
    expect(received).toEqual(expected);
  });

  it("Testing children input in SearchBar component", function () {
    let childrenInputWrapper = searchBarWrapper.find('Input[name="children"]');
    childrenInputWrapper.simulate("change", {
      target: { name: "children", value: search.children },
    });
    let obj = wrapper.instance();
    const expected = search.children;
    const received = obj.state.searchState.children;
    expect(received).toEqual(expected);
  });

  it("Testing rooms input (rooms <= adults) in SearchBar component", function () {
    let roomsInputWrapper = searchBarWrapper.find('Input[name="rooms"]');
    roomsInputWrapper.simulate("change", {
      target: { name: "rooms", value: search.rooms },
    });
    let obj = wrapper.instance();
    const expected = search.rooms;
    const received = obj.state.searchState.rooms;
    expect(received).toEqual(expected);
  });

  it("Testing search button click in SearchBar component", function () {
    let buttonWrapper = searchBarWrapper.find('Button[label="SEARCH"]');
    let { history } = wrapper.instance().props;
    history.push = jest.fn(); // Mock Function
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    const expected = {
      pathname: "/search",
      state: {
        searchState: search,
      },
    };
    expect(history.push).toHaveBeenCalledWith(expected);
  });

  it("Testing rooms input (rooms > adults) in SearchBar component", function () {
    let roomsInputWrapper = searchBarWrapper.find('Input[name="rooms"]');
    search.rooms += search.adults;
    roomsInputWrapper.simulate("change", {
      target: { name: "rooms", value: search.rooms },
    });
    search.adults = search.rooms;
    let obj = wrapper.instance();
    const expectedRooms = search.rooms;
    const receivedRooms = obj.state.searchState.rooms;
    expect(receivedRooms).toEqual(expectedRooms);
    const expectedAdults = search.adults;
    const receivedAdults = obj.state.searchState.adults;
    expect(receivedAdults).toEqual(expectedAdults);
  });

  it("Testing card click in the component", function () {
    let obj = wrapper.instance();
    let { history } = obj.props;
    history.push = jest.fn(); // Mock Function
    let i = 0;
    const hotel = hotelsExpected[i];
    const hotelId = hotel.hotel_id;
    obj.cardClick({
      preventDefault: () => {},
      currentTarget: { attributes: { hotelid: { value: hotelId } } },
    });
    expect(history.push).toHaveBeenCalledWith({
      pathname: "/hoteldetail/" + hotelId,
      state: {
        hotelDetails: hotel,
        searchState: search,
      },
    });
  });

  it("Testing getTopRatedHotels function in the component", function () {
    axios.get = jest.fn().mockResolvedValue({ data: hotels }); // Mock Data for axios call
    let obj = wrapper.instance();
    obj.getTopRatedHotels();
    expect(obj.state.results).toEqual(hotelsExpected);
  });

  it("Testing getTopRatedHotels function with API error in the component", function () {
    const error = { status: 404, message: "Error" };
    axios.get = jest.fn().mockRejectedValue(error); // Mock Error for axios call
    let obj = wrapper.instance();
    obj.getTopRatedHotels();
    // expect(logger).toHaveBeenCalledWith("error", error); // logger is read-only, not allowed to mock
    expect(obj.state.results).toEqual(hotelsExpected);
  });
});

function getDateAfterDays(days = 0) {
  let date = new Date(new Date().getTime() + 86400 * 1000 * days);
  let dd = `0${date.getDate() + 1}`.slice(-2);
  let mm = `0${date.getMonth() + 1}`.slice(-2);
  return `${date.getFullYear()}-${mm}-${dd}`;
}
