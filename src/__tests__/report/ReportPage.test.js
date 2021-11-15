import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import ReportPage from "../../component/reportSearch/reportpage";
import axios from "axios";

configure({
  adapter: new Adapter(),
});

let hotels = [
  {
    hotel_id: 16,
    hotelName: "jaswanth1",
    phone: "12334",
    email: "e1",
    hotelAddressId: 16,
    checkInTime: "09:00 AM",
    checkOutTime: "08:00 PM",
    taxRate: 3,
    hotelAdminId: 1,
    hotelVisibility: false,
    createdOn: "2020-01-01",
    rating: 2.5,
  },
  {
    hotel_id: 17,
    hotelName: "jaswanth1",
    phone: "12334",
    email: "e1",
    hotelAddressId: 17,
    checkInTime: "09:00 AM",
    checkOutTime: "08:00 PM",
    taxRate: 3,
    hotelAdminId: 1,
    hotelVisibility: false,
    createdOn: "2020-01-01",
    rating: 2.5,
  },
  {
    hotel_id: 18,
    hotelName: "jaswanth1",
    phone: "12334",
    email: "e1",
    hotelAddressId: 18,
    checkInTime: "09:00 AM",
    checkOutTime: "08:00 PM",
    taxRate: 3,
    hotelAdminId: 1,
    hotelVisibility: false,
    createdOn: "2020-01-01",
    rating: 2.5,
  },
];

let wrapper = null;
let searchBarWrapper = null;

let search = {
  fromDate: "2019-01-01",
  toDate: "2021-01-01",
  fromRating: 2,
  toRating: 5,
  infrastructure: "Room Service",
};


describe("Testing ReportPage component", function () {

  let wrapper;
    
  beforeEach( () => {
      wrapper= shallow(<ReportPage results={hotels}/>)
  });
  // Fails beacuse of initial value for props (Array variable not initialized)
  it("Testing whether the component mounts or not without any props", function () {
    shallow(<ReportPage />);
  });

  // Throws warning for not having unique keys in each child in the list
  it("Testing whether the component mounts or not with props", function () {
    const expected = 2;
    const received = wrapper.find("Button").length;
    expect(received).toBe(expected);
  });

  it("Testing whether ReportSearchBar component mounted or not", function () {
    searchBarWrapper = wrapper.find("ReportSearchBar").dive();
    // console.log(searchBarWrapper.debug());
  });

  it("Testing search button click without search state in SearchBar component", function () {
    let buttonWrapper = searchBarWrapper.find('Button[label="SEARCH"]');
    window.alert = jest.fn(); // Mock Function
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    const expected = "Please fill in all search inputs";
    expect(window.alert).toHaveBeenCalledWith(expected);
  });

  // it("Testing fromDate input in ReportSearchBar component", function () {
  //   let fromDateInputWrapper = searchBarWrapper.find('Input[name="fromDate"]');
  //   // fromDateInputWrapper.simulate("change", {
  //   //   target: { name: "fromDate", value: "2019-01-01" },
  //   // });
  //   const e= {
  //     target: { name: "fromDate", value: "2019-01-01" }
  //   }
  //   fromDateInputWrapper.props().onChange(e);
  //   let obj = wrapper.instance();
  //   console.log(fromDateInputWrapper.debug());
  //   const expected = search.fromDate;
  //   const received = obj.state.searchState.fromDate;
  //   expect(received).toEqual(expected);
  // });

  it("Testing search button click in SearchBar component", async function () {
    let buttonWrapper = searchBarWrapper.find('Button[label="SEARCH"]');
    axios.get = jest.fn().mockResolvedValue({ data: hotels });
    // buttonWrapper.simulate('click', { preventDefault: () => {} }); // onClick not defined
    buttonWrapper.props().handleClick({ preventDefault: () => {} });
    await wrapper.instance();
    let obj = await wrapper.instance();
    expect(obj.state.results.length).toEqual(0);
    // expect(obj.state.filteredResults.length).toEqual(hotelsExpected.length);
  });
  
});
