import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import SearchResultsPage from "../../component/searchresultspage/searchresults";
import axios from "axios";
import {
  AMENITIES,
  ROOMTYPES,
  LOCATIONS,
} from "../../component/utility/Constant";

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
    hotelImgSrc:
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
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
    hotelImgSrc:
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
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
    hotelImgSrc:
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
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
    hotelImgSrc:
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
  },
  {
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
        roomTypeName: "Deluxe",
        roomCapacity: 2,
        totalRoomCount: 5,
        roomPrice: 3000,
        roomInclusions: [1, 2],
      },
    ],
    amenities: "Dining Area,Lounge",
    rating: 3.2,
    hotelImgSrc:
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
  },
  {
    hotel_id: "h006",
    hotelName: "Hotel 6",
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
        roomPrice: 200,
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
    amenities: "First-aid Services,Room Service,Lounge",
    rating: 2.2,
    hotelImgSrc:
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
  },
  {
    hotel_id: "h007",
    hotelName: "Hotel 7",
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
        roomPrice: 100,
        roomInclusions: [1, 2],
      },
      {
        roomTypeName: "Deluxe",
        roomCapacity: 2,
        totalRoomCount: 3,
        roomPrice: 600,
        roomInclusions: [1, 2],
      },
    ],
    amenities: "Restaurant/Coffee Shop,Lounge",
    rating: 4.2,
    hotelImgSrc:
      "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
  },
];

let hotelsExpected = [];

let hotelAmenities = AMENITIES.map((amenity, index) => {
  return {
    name: amenity.key,
    id: index + 1,
  };
});

let roomTypes = ROOMTYPES.map((roomtype, index) => {
  return {
    name: roomtype.label,
    id: index + 1,
  };
});

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

let priceFilter = {
  minPrice: 10,
  maxPrice: 100,
};
let hotelAmenitiesIndex = 4;
let roomTypesIndex = 1;

let wrapper = null;
let searchBarWrapper = null;

axios.get = jest.fn().mockResolvedValue({});

describe("Testing SearchResultsPage component", function () {
  it("Testing whether the component mounts", function () {
    axios.get.mockResolvedValue({ data: hotels }); // Mock Data for axios call
    wrapper = shallow(
      <SearchResultsPage location={{}} history={{ push: () => {} }} />
    );
    hotelsExpected = hotels.map((hotel) => {
      return {
        ...hotel,
        amenities: hotel.amenities.split(","),
      };
    });
  });

  it("Testing state after mounting", function () {
    let obj = wrapper.instance();
    expect(obj.state.results).toEqual([]); // Compare both as Strings
    expect(obj.state.filteredResults).toEqual([]);
    expect(obj.state.hotelAmenities).toEqual(hotelAmenities);
    expect(obj.state.roomTypes).toEqual(roomTypes);
  });

  it("Testing set state", function () {
    let obj = wrapper.instance();
    let hotel = {
      hotel_id: "h008",
      hotelName: "Hotel 8",
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
      hotelImgSrc:
        "https://cdn1.goibibo.com/voy_ing/t_g/23988756189e11e5bde10022195573b9.jfif",
    };
    hotels.push(hotel);
    hotelsExpected.push(hotel);
    obj.setState({ results: hotelsExpected });
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

    // locationInputWrapper.simulate("change", {
    //   label: "bangalore"
    // });
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

  // async/await used to avoid race conditions during component update
  it("Testing search button click in SearchBar component", async function () {
    let buttonWrapper = searchBarWrapper.find('Button[label="SEARCH"]');
    axios.get = jest.fn().mockResolvedValue({ data: hotels });
    //    console.log = jest.fn(); // Mock Function
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    await wrapper.instance();
    let obj = await wrapper.instance();
    expect(obj.state.results).toEqual(hotelsExpected);
    // expect(obj.state.filteredResults.length).toEqual(hotelsExpected.length);
  });

  it("Testing min price input in the component", function () {
    let minPriceInputWrapper = wrapper.find('Input[name="minPrice"]');
    minPriceInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "minPrice", value: priceFilter.minPrice },
    });
    let obj = wrapper.instance();
    const expected = priceFilter.minPrice;
    const received = obj.state.minPrice;
    expect(received).toEqual(expected);
  });

  it("Testing max price input in the component", function () {
    let maxPriceInputWrapper = wrapper.find('Input[name="maxPrice"]');
    maxPriceInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "maxPrice", value: priceFilter.maxPrice },
    });
    let obj = wrapper.instance();
    const expected = priceFilter.maxPrice;
    const received = obj.state.maxPrice;
    expect(received).toEqual(expected);
  });

  it("Testing price filter button click in the component", function () {
    let buttonWrapper = wrapper.find("#priceFilterButton");
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    let obj = wrapper.instance();
    expect(obj.state.selectedFilters.minPrice).toEqual(priceFilter.minPrice);
    expect(obj.state.selectedFilters.maxPrice).toEqual(priceFilter.maxPrice);
    expect(obj.state.results).toEqual(hotelsExpected);
    expect(obj.state.filteredResults.length).toEqual(3);
  });

  // Not used currently
  // it("Testing rating filter click in the component", function () {
  //   let obj = wrapper.instance();
  //   let ratingsFilterWrapper = wrapper.find(
  //     "#hotelRatingsFilter > *.checkboxList"
  //   );
  //   let len = ratingsFilterWrapper.children().length;
  //   let i = Math.floor(Math.random() * len);
  //   let ratingFilterWrapper = ratingsFilterWrapper.children().at(i);

  //   const name = ratingFilterWrapper.props().name;
  //   const label = ratingFilterWrapper.props().label;
  //   const children = ratingsFilterWrapper.props().children.map((child) => ({ children: [{ ...child.props, checked: false }] }));

  //   // Simulate rating filter check
  //   ratingFilterWrapper.simulate("click", {
  //     preventDefault: () => { },
  //     target: { nodeName: "INPUT", parentElement: { innerText: label, parentElement: { children } } },
  //   });
  //   expect(obj.state.selectedFilters.hotelRating).toEqual(name);

  //   // Simulate rating filter uncheck
  //   ratingFilterWrapper.simulate("click", {
  //     preventDefault: () => { },
  //     target: { nodeName: "INPUT", parentElement: { innerText: label, parentElement: { children } } },
  //   });
  //   expect(obj.state.selectedFilters.hotelRating).toEqual(0);
  // });

  it("Testing amenities filter click in the component", function () {
    let obj = wrapper.instance();
    let amenitiesFilterWrapper = wrapper.find(
      "#hotelAmenitiesFilter > *.checkboxList"
    );

    let amenityFilterWrapper = amenitiesFilterWrapper
      .children()
      .at(hotelAmenitiesIndex);
    const id = amenityFilterWrapper.props().filterItemId;

    // Simulate amenity filter check
    amenityFilterWrapper.simulate("click", {
      preventDefault: () => {},
      target: {
        nodeName: "INPUT",
        parentElement: { attributes: { filterItemId: { value: id } } },
      },
    });
    expect(obj.state.selectedFilters.hotelAmenities).toEqual([id]);
    expect(obj.state.filteredResults.length).toEqual(2);

    // Simulate amenity filter uncheck
    amenityFilterWrapper.simulate("click", {
      preventDefault: () => {},
      target: {
        nodeName: "INPUT",
        parentElement: { attributes: { filterItemId: { value: id } } },
      },
    });
    expect(obj.state.selectedFilters.hotelAmenities).toEqual([]);
    expect(obj.state.filteredResults.length).toEqual(3);

    amenityFilterWrapper.simulate("click", {
      preventDefault: () => {},
      target: { parentElement: { innerText: id } },
    });
    expect(obj.state.selectedFilters.hotelAmenities).toEqual([]);
  });

  it("Testing rooms filter click in the component", function () {
    let obj = wrapper.instance();
    let roomsFilterWrapper = wrapper.find("#roomTypesFilter > *.checkboxList");

    let roomFilterWrapper = roomsFilterWrapper.children().at(roomTypesIndex);
    const label = roomFilterWrapper.props().label;

    // Simulate room filter check
    roomFilterWrapper.simulate("click", {
      preventDefault: () => {},
      target: { nodeName: "INPUT", parentElement: { innerText: label } },
    });
    expect(obj.state.selectedFilters.roomTypes).toEqual([label]);
    expect(obj.state.filteredResults.length).toEqual(0);

    // Simulate room filter uncheck
    roomFilterWrapper.simulate("click", {
      preventDefault: () => {},
      target: { nodeName: "INPUT", parentElement: { innerText: label } },
    });
    expect(obj.state.selectedFilters.roomTypes).toEqual([]);
    expect(obj.state.filteredResults.length).toEqual(3);

    roomFilterWrapper.simulate("click", {
      preventDefault: () => {},
      target: { parentElement: { innerText: label } },
    });
    expect(obj.state.selectedFilters.roomTypes).toEqual([]);
  });

  it("Testing both amenities and rooms filter click in the component", function () {
    let obj = wrapper.instance();

    let amenitiesFilterWrapper = wrapper.find(
      "#hotelAmenitiesFilter > *.checkboxList"
    );
    let amenityFilterWrapper = amenitiesFilterWrapper
      .children()
      .at(hotelAmenitiesIndex);
    const id = amenityFilterWrapper.props().filterItemId;
    // Simulate amenity filter check
    amenityFilterWrapper.simulate("click", {
      preventDefault: () => {},
      target: {
        nodeName: "INPUT",
        parentElement: { attributes: { filterItemId: { value: id } } },
      },
    });

    let roomsFilterWrapper = wrapper.find("#roomTypesFilter > *.checkboxList");
    let roomFilterWrapper = roomsFilterWrapper.children().at(roomTypesIndex);
    const label = roomFilterWrapper.props().label;
    // Simulate room filter check
    roomFilterWrapper.simulate("click", {
      preventDefault: () => {},
      target: { nodeName: "INPUT", parentElement: { innerText: label } },
    });

    expect(obj.state.selectedFilters.hotelAmenities).toEqual([id]);
    expect(obj.state.selectedFilters.roomTypes).toEqual([label]);
    expect(obj.state.filteredResults.length).toEqual(0);
  });

  it("Testing rooms input (rooms > adults) in SearchBar component", function () {
    let roomsInputWrapper = searchBarWrapper.find('Input[name="rooms"]');
    search.rooms += search.adults;
    roomsInputWrapper.simulate("change", {
      target: { name: "rooms", value: search.rooms },
    });

    let obj = wrapper.instance();
    expect(obj.state.searchState.rooms).toEqual(search.rooms);
    expect(obj.state.searchState.adults).toEqual(search.rooms);
  });

  it("Testing invalid min price input in the component", function () {
    let obj = wrapper.instance();
    let minPriceInputWrapper = wrapper.find('Input[name="minPrice"]');
    let buttonWrapper = wrapper.find("#priceFilterButton");

    minPriceInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "minPrice", value: "" },
    });
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    expect(obj.state.selectedFilters.minPrice).toEqual(0);

    minPriceInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "minPrice", value: -10 },
    });
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    expect(obj.state.selectedFilters.minPrice).toEqual(0);

    // Setting value back to Mock value
    minPriceInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "minPrice", value: priceFilter.minPrice },
    });
  });

  it("Testing invalid max price input in the component", function () {
    let obj = wrapper.instance();
    let maxPriceInputWrapper = wrapper.find('Input[name="maxPrice"]');
    let buttonWrapper = wrapper.find("#priceFilterButton");

    maxPriceInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "maxPrice", value: "" },
    });
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    expect(obj.state.selectedFilters.maxPrice).toEqual(1000000);

    maxPriceInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "maxPrice", value: -10 },
    });
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    expect(obj.state.selectedFilters.maxPrice).toEqual(1000000);

    // Setting value back to Mock value
    maxPriceInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "maxPrice", value: priceFilter.maxPrice },
    });
  });

  it("Testing min price > max price input in the component", function () {
    let obj = wrapper.instance();
    let maxPriceInputWrapper = wrapper.find('Input[name="maxPrice"]');
    let buttonWrapper = wrapper.find("#priceFilterButton");

    maxPriceInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "maxPrice", value: priceFilter.minPrice - 1 },
    });
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    expect(obj.state.selectedFilters.maxPrice).toEqual(1000000);

    // Setting value back to Mock value
    maxPriceInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "maxPrice", value: priceFilter.maxPrice },
    });
  });

  it("Testing API error on component mount", function () {
    const error = { status: 404, message: "Error" };
    axios.get.mockRejectedValue(error); // Mock Error for axios call
    // console.log = jest.fn();
    wrapper = shallow(
      <SearchResultsPage location={{ state: { searchState: search } }} />
    );
    let obj = wrapper.instance();
    // expect(console.log).toHaveBeenCalledWith(error);
    expect(obj.state.results).toEqual([]);
  });

  // async/await used to avoid race conditions during component update
  it("Testing the search state on component mounts", async function () {
    hotels.pop();
    hotelsExpected.pop();
    axios.get.mockResolvedValue({ data: hotels }); // Mock Data for axios call
    wrapper = shallow(
      <SearchResultsPage
        location={{ state: { searchState: search } }}
        history={{ push: () => {} }}
      />
    );
    await wrapper.instance();
    let obj = await wrapper.instance();
    expect(wrapper.instance().state.results).toEqual(hotelsExpected); // Compare both as Strings
    expect(obj.state.hotelAmenities).toEqual(hotelAmenities);
    expect(obj.state.roomTypes).toEqual(roomTypes);
    expect(obj.state.searchState).toEqual(search);
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
});

function getDateAfterDays(days = 0) {
  let date = new Date(new Date().getTime() + 86400 * 1000 * days);
  let dd = `0${date.getDate()}`.slice(-2);
  let mm = `0${date.getMonth() + 1}`.slice(-2);
  return `${date.getFullYear()}-${mm}-${dd}`;
}
