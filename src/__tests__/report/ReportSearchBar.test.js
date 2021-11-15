import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import "../../setupTests.js";
import ReportSearchBar from "../../component/reportSearch/ReportSearchBar";
import AdminLandingPage from "../../component/adminLandingPage/adminlandingpage";
import axios from "axios";

configure({
  adapter: new Adapter(),
});
let wrapper;
let wrapper1;
beforeEach(() => {
  wrapper1 = shallow(<AdminLandingPage history={{ push: () => {} }} />);
  let obj2 = wrapper1.instance();
  let obj1 = {
    searchState: {
      fromDate: "",
      toDate: "",
      fromRating: 0,
      toRating: 5,
      infrastructure: "",
    },
  };
  wrapper = shallow(
    <ReportSearchBar
      searchState={obj1.searchState}
      setData={obj2.setData}
      search={obj2.search}
    />
  );
});
describe("Testing SearchBar component", function () {
  it("Testing whether the component is mount or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("To count the number of input tags", function () {
    let len = wrapper.find("Input").length;
    // console.log(len);
    expect(len).toBe(4);
  });
  it("To count the number of button tags", function () {
    try {
      let len = wrapper.find("Button").length;
      expect(len).toBe(1);
    } catch (error) {
      fail();
    }
  });
  it("Testing the initial state values ", function () {
    try {
      let obj = wrapper.instance();
      let fromDate = obj.props.searchState.fromDate;
      let toDate = obj.props.searchState.toDate;
      let fromRating = obj.props.searchState.fromRating;
      let toRating = obj.props.searchState.toRating;
      let infrastructure = obj.props.searchState.infrastructure;
      let rooms = obj.props.searchState.rooms;
      expect(fromDate).toBe("");
      expect(toDate).toBe("");
      expect(fromRating).toBe(0);
      expect(toRating).toBe(5);
      expect(infrastructure).toBe("");
    } catch (error) {
      fail();
    }
  });

  it("Testing the setData   ", function () {
    let obj = wrapper1.instance();
    let event = { target: { name: "fromDate", value: "value" } };
    obj.setData(event);
    expect(obj.state.searchState.fromDate).toBe("value");
  });

  it("Testing the search    ", function () {
    let obj = wrapper1.instance();
    let event = {
      target: { name: "fromDate", value: "value" },
      preventDefault: () => {},
    };
    obj.search(event);
    // expect(obj.state.searchState.fromDate).toBe("value");
  });

  it("Testing the getTopRatedHotels     ", function () {
    let obj = wrapper1.instance();
    axios.get = jest.fn().mockResolvedValue({ data: [] });
    obj.getTopRatedHotels();

    expect(obj.state.results).toStrictEqual([]);
  });

  it("Testing the cardClick ", function () {
    let obj = wrapper1.instance();
    let event = {
      target: { name: "fromDate", value: "value" },
      preventDefault: () => {},
      currentTarget: {
        attributes: {
          hotelid: {
            value: 10,
          },
        },
      },
    };
    obj.cardClick(event);
  });
});
