import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Navbar from "../../component/headerandfooter/Navbar";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Navbar />);
});

describe("Testing Navbar Component", function () {
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
  it("To count numbers of NavHead Component", function () {
    try {
      let count = wrapper.find("NavHead").length;
      expect(count).toBe(1);
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of li tag when user is not logged in ", function () {
    try {
      let count = wrapper.find("li").length;
      expect(count).toBe(4);
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of Link Component when user is not logged in ", function () {
    try {
      let count = wrapper.find("Link").length;
      expect(count).toBe(4);
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of li tag when user is logged in ", function () {
    try {
      let obj = wrapper.instance();
      obj.setState({ isLoggedIn: true });
      let count = wrapper.find("li").length;
      expect(count).toBe(5);
    } catch (error) {
      fail();
    }
  });

  it("To count numbers of Link Component when user is logged in ", function () {
    try {
      let obj = wrapper.instance();
      obj.setState({ isLoggedIn: true });
      let count = wrapper.find("Link").length;
      expect(count).toBe(5);
    } catch (error) {
      fail();
    }
  });

  it("To check classname for nav tag ", function () {
    try {
      let classNamepresent = wrapper.find("nav").hasClass("navbar");
      expect(classNamepresent).toBe(true);
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
  it('To check initial value of "isLoggedIn" is false or not', function () {
    try {
      let obj = wrapper.instance();
      expect(obj.state.isLoggedIn).toBe(false);
    } catch (error) {
      //      console.log(error);
      fail();
    }
  });
  it('To test click  on "logout" changes the value of "isLoggedIn" to false or not ', function () {
    try {
      let obj = wrapper.instance();
      obj.setState({ isLoggedIn: true });
      // wrapper.find('Link').at(3).simulate('click')
      obj.logout();
      expect(obj.state.isLoggedIn).toBe(false);
    } catch (error) {
      //      console.log(error);
      fail();
    }
  });
});
