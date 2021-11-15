import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import ReportTable from "../../component/reportSearch/reporttable";

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
    rating: 2.5
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
        rating: 2.5
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
        rating: 2.5
    }
];

let wrapper = null;

describe("Testing ReportTable component", function () {
  // Fails beacuse of initial value for props (Array variable not initialized)
  

  it("Testing whether the component mounts with props", function () {
    wrapper = shallow(<ReportTable results = {hotels} />);
  });

  // Throws warning for not having unique keys in each child in the list
  it("Testing whether the no.of rows returned is correct", function () {
    wrapper = shallow(<ReportTable results = {hotels} />);
    const expected = hotels.length;
    const received = wrapper.find("tr").length - 1;
    expect(received).toBe(expected);
  });
});
