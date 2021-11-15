import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Footer from "../../component/headerandfooter/Footer";
import { APPLICATION_NAME } from "../../component/utility/Constant";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Footer />);
});

describe("Testing Footer Component", function () {
  it("To count numbers of footer tag", function () {
    try {
      let count = wrapper.find("footer").length;
      expect(count).toBe(1);
    } catch (error) {
      fail();
    }
  });

  it("To count numbers of div tags", function () {
    try {
      let count = wrapper.find("div").length;
      expect(count).toBe(11);
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of p tag", function () {
    try {
      let count = wrapper.find("p").length;
      expect(count).toBe(2);
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of anchor tag", function () {
    try {
      let count = wrapper.find("a").length;
      expect(count).toBe(8);
    } catch (error) {
      fail();
    }
  });
  it("To count numbers of i Tag", function () {
    try {
      let count = wrapper.find("i").length;
      expect(count).toBe(2);
    } catch (error) {
      fail();
    }
  });

  it("To check classname for all div tag ", function () {
    try {
      let classNamepresent = [
        wrapper.find("div").at(0).hasClass("content"),
        wrapper.find("div").at(1).hasClass("box"),
        wrapper.find("div").at(2).hasClass("upper"),
        wrapper.find("div").at(3).hasClass("topic"),
        wrapper.find("div").at(4).hasClass("bottom"),
        wrapper.find("div").at(5).hasClass("right box"),
        wrapper.find("div").at(6).hasClass("lower"),
        wrapper.find("div").at(7).hasClass("topic"),
        wrapper.find("div").at(8).hasClass("phone"),
        wrapper.find("div").at(9).hasClass("email"),
        wrapper.find("div").at(10).hasClass("media-icons"),
      ];
      expect(classNamepresent).toStrictEqual([
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ]);
    } catch (error) {
      //      console.log(error);
      fail();
    }
  });

  it("To check text of p tag ", function () {
    try {
      let textofptag = wrapper.find("p").at(1).text();
      expect(textofptag).toBe("Copyright © 2021 | All rights reserved");
    } catch (error) {
      //      console.log(error);
      fail();
    }
  });

  it('To check text of a in div with classname="bottom" ', function () {
    try {
      let textofanchortag = wrapper.find("a").at(0).text();
      expect(textofanchortag).toBe(APPLICATION_NAME);
    } catch (error) {
      //      console.log(error);
      fail();
    }
  });
  it('To check text of anchor tag in div with classname="email" ', function () {
    try {
      let textofanchortag = wrapper.find("a").at(3).text();
      expect(textofanchortag).toBe("<FaEnvelope />helpdesk@bookrightaway.com");
    } catch (error) {
      //      console.log(error);
      fail();
    }
  });
  it('To check text of anchor tag in div with classname="phone"', function () {
    let textofanchortag = wrapper.find("a").at(2).text();
    expect(textofanchortag).toBe("<FaPhone />1800-111-1111");
  });
});
