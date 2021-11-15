import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Adminnavbar from "../../component/adminheaderfooter/Adminnavbar";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Adminnavbar />);
});

describe("Testing Navbar Component", function () {
  it("Testing whether the object is created or not", function () {
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("To count numbers of nav tags", function () {
    try {
      let count = wrapper.find("nav").length;
      expect(count).toBe(1);
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of ul tag", function () {
    try {
      let count = wrapper.find("ul").length;
      expect(count).toBe(1);
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of Adminavhead Component", function () {
    try {
      let count = wrapper.find("Adminnavhead").length;
      expect(count).toBe(1);
    } catch (error) {
      fail();
    }
  });
  it("To check classname for ul tag ", function () {
    try {
      let classNamepresent = wrapper.find("ul").hasClass("navitems");
      expect(classNamepresent).toBe(true);
    } catch (error) {
      fail();
    }
  });
  it("To check classname for li tags ", function () {
    try {
      let classNamepresent = [
        wrapper.find("li").at(0).hasClass("navitems-li"),
        wrapper.find("li").at(1).hasClass("navitems-li"),
        wrapper.find("li").at(2).hasClass("navitems-li"),
      ];
      expect(classNamepresent).toStrictEqual([true, true, true]);
    } catch (error) {
      //      console.log(error);
      fail();
    }
  });
  it("To check classname for Link tag ", function () {
    try {
      let classNamepresent = [
        wrapper.find("Link").at(0).hasClass("navitems-link"),
        wrapper.find("Link").at(1).hasClass("navitems-link"),
        wrapper.find("Link").at(2).hasClass("navitems-link"),
      ];
      expect(classNamepresent).toStrictEqual([true, true, true]);
    } catch (error) {
      //      console.log(error);
      fail();
    }
  });

  it("To test login ", function () {
    let obj = wrapper.instance();
    obj.login();
    expect(obj.state.isLoggedIn).toBe(true);
  });

  it("To test logout ", function () {
    let obj = wrapper.instance();
    obj.logout();
    expect(obj.state.isLoggedIn).toBe(false);
  });
});
