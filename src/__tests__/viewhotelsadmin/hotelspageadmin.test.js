import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import axios from "axios";
import HotelsPageAdmin from "../../component/viewhotelsadmin/HotelsPageAdmin";
import HotelCardsList from "../../component/viewhotelsadmin/HotelCardsList";
import HotelCardAdmin from "../../component/viewhotelsadmin/HotelCardAdmin";
import ToggleSwitchAdmin from "../../component/viewhotelsadmin/ToggleSwitchAdmin";
import { HOTEL_SERVICE_BASE_URL } from "../../component/utility/Constant";

let hotels = [
  {
    hotelId: 10,
    hotelName: "Marriot",
    phone: "12334",
    email: "e1",
    checkInTime: "2022-02-23",
    checkOutTime: "2022-02-25",
    taxRate: 3,
    hotelAdminId: 0,
    hotelVisibility: false,
    createdOn: "2020-06-01",
    rating: 4,
    localAddress: "la1",
    region: "Maharashtra",
    importantLandmarks: "il1,il2",
    city: "Mumbai",
    pincode: "400055",
    coordinates: null,
    rooms: [
      {
        roomTypeName: "General",
        roomCapacity: 2,
        totalRoomCount: 5,
        roomPrice: 1000,
        inclusions: "ri1,ri1",
      },
      {
        roomTypeName: "Deluxe",
        roomCapacity: 2,
        totalRoomCount: 5,
        roomPrice: 1000,
        inclusions: "ri3,ri4",
      },
    ],
    hotelImages: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    ],
    amenities: "Pool, Balcony",
  },
];
configure({
  adapter: new Adapter(),
});

let wrapper = null;
let searchBarWrapper = null;

describe("Testing SearchResultsPage component", function () {
  // Throws Warnings
  it("Testing whether the component mounts", function () {
    // try {
    axios.get = jest.fn().mockResolvedValue({});
    axios.get.mockResolvedValue({ data: hotels }); // Mock Data for axios call
    wrapper = shallow(<HotelsPageAdmin />);
    let obj = wrapper.instance();
    obj.setState({ results: hotels });
    // console.log(obj.state.results)
    expect(obj.state.results.length).toBe(1);
    // } catch (error) {
    //     console.log(error)
    //     fail()
    // }
  });
  it("Testing lock status toggle switch", function () {
    // try {
    axios.get = jest.fn().mockResolvedValue({});
    axios.get.mockResolvedValue({ data: hotels });
    wrapper = shallow(<HotelsPageAdmin />);
    let obj = wrapper.instance();
    obj.setState({ results: hotels });
    let wrapper2 = shallow(
      <HotelCardsList
        results={hotels}
        toggleVisibility={obj.toggleVisibility}
      />
    );
    let obj2 = wrapper2.instance();
    let wrapper3 = shallow(
      <HotelCardAdmin
        hotelid={obj.state.results[0].hotel_id}
        toggleVisibility={obj2.toggleVisibility}
        hotelName={obj.state.results[0].hotelName}
        hotelPrice={obj2.minprice(obj.state.results[0].rooms)}
        hotelCity={obj.state.results[0].city}
        hotelPincode={obj.state.results[0].pincode}
        hotelRegion={obj.state.results[0].region}
        hotelAmenities={obj.state.results[0].amenities}
        hotelImgSrc={obj.state.results[0].hotelImages[0]}
        hotelVisibility={obj.state.results[0].hotelVisibility}
      />
    );
    let obj3 = wrapper3.instance();
    axios.put = jest.fn().mockResolvedValue({});
    axios.put.mockResolvedValue({ data: hotels });
    let wrapper4 = shallow(
      <ToggleSwitchAdmin
        key={obj3.hotelid}
        checked={obj3.hotelVisibility}
        toggleVisibility={obj.toggleVisibility}
        hotelid={obj3.hotelid}
      />
    );
    let obj4 = wrapper4.instance();
    wrapper4.find("input").at(0).simulate("change", {});

    expect(obj.state.results[0].hotelVisibility).toBe(false);

    obj.changeVisibility(hotels[0].hotelId);

    expect(obj.state.results[0].hotelVisibility).toBe(true);
    // } catch (error) {
    //   console.log(error)
    //   fail()
    // }
  });
  it("Testing location filter", function () {
    jest.mock("axios");
    axios.get.mockResolvedValue((url) => {
      if (url === HOTEL_SERVICE_BASE_URL + "/user/hotels") {
        //              console.log(hotels)
        return Promise.resolve({ data: hotels });
      }
    });
    wrapper = shallow(<HotelsPageAdmin />);
    let obj = wrapper.instance();
    obj.getAdminHotels();
    obj.setState({ results: hotels, filteredResults: hotels });
    wrapper.find('Input[name="location"]').simulate("change", {
      target: { name: "location", value: "mum" },
    });
    expect(obj.state.filteredResults.length).toEqual(1);
    wrapper.find('Input[name="location"]').simulate("change", {
      target: { name: "location", value: "d" },
    });
    expect(obj.state.filteredResults.length).toEqual(0);
    wrapper.find('Input[name="location"]').simulate("change", {
      target: { name: "location", value: "verylongstring" },
    });
    expect(obj.state.filteredResults.length).toEqual(0);
    //      console.log(obj.state.results)
  });
  it("Testing hotel name filter", function () {
    jest.mock("axios");
    axios.get.mockResolvedValue((url) => {
      if (url === HOTEL_SERVICE_BASE_URL + "/user/hotels") {
        //              console.log(hotels)
        return Promise.resolve({ data: hotels });
      }
    });
    wrapper = shallow(<HotelsPageAdmin />);
    let obj = wrapper.instance();
    obj.getAdminHotels();
    obj.setState({ results: hotels, filteredResults: hotels });
    wrapper.find('Input[name="hotelName"]').simulate("change", {
      target: { name: "hotelName", value: "mar" },
    });
    expect(obj.state.filteredResults.length).toEqual(1);
    wrapper.find('Input[name="hotelName"]').simulate("change", {
      target: { name: "hotelName", value: "d" },
    });
    expect(obj.state.filteredResults.length).toEqual(0);
    wrapper.find('Input[name="hotelName"]').simulate("change", {
      target: { name: "hotelName", value: "verylongstring" },
    });
    expect(obj.state.filteredResults.length).toEqual(0);
    //      console.log(obj.state.results)
  });
});
