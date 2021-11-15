import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import AllBills from "../../component/bill/AllBills";
import axios from "axios";
configure({
  adapter: new Adapter(),
});
let wrapper;
const location = { state: { bookingId: 29 } };
beforeEach(() => {
  wrapper = shallow(
    <AllBills location={location} />
  );
});

window.alert = jest.fn();
describe("Testing Bill Entry Component", function () {
    it("Testing whether the object is created or not", function () {
      try {
        let obj = wrapper.instance();
      } catch (error) {
        fail();
      }
    });
    it("To count numbers of Input tags on AllBill ", function () {
        try {
          let obj = wrapper.instance();
          let count = wrapper.find("div").length;
        } catch (error) {
          fail();
        }
      });
      it("To count numbers of table tags on AllBill ", function () {
        try {
          let obj = wrapper.instance();
          let count = wrapper.find("table").length;
        } catch (error) {
          fail();
        }
      });
      it("To count numbers of thead tags on AllBill ", function () {
        try {
          let obj = wrapper.instance();
          let count = wrapper.find("thead").length;
        } catch (error) {
          fail();
        }
      });
      it("To count numbers of th tags on AllBill ", function () {
        try {
          let obj = wrapper.instance();
          let count = wrapper.find("th").length;
        } catch (error) {
          fail();
        }
      });
      it("To count numbers of tr tags on AllBill ", function () {
        try {
          let obj = wrapper.instance();
          let count = wrapper.find("tr").length;
        } catch (error) {
          fail();
        }
      });
      it("To count numbers of td tags on AllBill ", function () {
        try {
          let obj = wrapper.instance();
          let count = wrapper.find("tr").length;
        } catch (error) {
          fail();
        }
      });
});