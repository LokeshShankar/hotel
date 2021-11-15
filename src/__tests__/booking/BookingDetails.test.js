import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import axios from "axios";
import BookingDetails from "../../component/booking/BookingDetails";

configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  axios.post = jest.fn().mockResolvedValue({ data: "Payment Successfully" });
  wrapper = shallow(<BookingDetails {...prop} />);
  window.alert = jest.fn();
});

describe("Testing Add Hotel Component", function () {
  it("Testing whether the object is created or not", function () {
    let obj = wrapper.instance();
  });

  it("Testing with bookingInProgress as true", function () {
    wrapper.setState({ bookInProgress: true });
    let obj = wrapper.instance();
  });

  it("Testing the payment function", function () {
    wrapper.instance().loadRazorpayScript = jest.fn(() => {
      Promise.resolve();
    });
    let obj = wrapper.instance();
    obj.payment();
    //    console.log(obj.state);
  });

  it("Testing the failed payment", function () {
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );
    let obj = wrapper.instance();
    obj.payment();
  });

  it("Mock Razorpay open", function () {
    window.Razorpay = jest.fn({
      on: () => {
        return Promise.resolve();
      },
    });
    wrapper.instance().loadRazorpayScript = jest.fn(() => {
      Promise.resolve();
    });
    let obj = wrapper.instance();
    obj.payment();
  });

  it("Test paymentCompleteAndBooking ", function () {
    let obj = wrapper.instance();

    obj.paymentCompleteAndBooking(response);
  });

  it("Testing the failed paymentCompleteAndBooking ", function () {
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );
    let obj = wrapper.instance();
    obj.paymentCompleteAndBooking(response);
  });

  it("Failed Mock Razorpay open", function () {
    wrapper.instance().loadRazorpayScript = jest.fn(() => {
      return Promise.reject(new Error("Network Error"));
    });
    let obj = wrapper.instance();
    obj.payment();
  });
});

let prop = {
  location: {
    state: {
      results: [
        {
          roomType: "Semi Deluxe",
          maxPersons: 2,
          roomCount: 3,
          roomPrice: 4444,
          roomInclusions: [
            "Free Wifi",
            "Breakfast Buffet",
            "Free Breakfast",
            "Lunch and Dinner",
          ],
        },
        {
          roomType: "Deluxe",
          maxPersons: 2,
          roomCount: 3,
          roomPrice: 3333,
          roomInclusions: [
            "Free Breakfast",
            "Breakfast Buffet",
            "Free Breakfast",
            "Lunch and Dinner",
          ],
        },
        {
          roomType: "General",
          maxPersons: 1,
          roomCount: 1,
          roomPrice: 1000,
          roomInclusions: ["Free Wifi", "Breakfast Buffet"],
        },
      ],
      taxRate: 18,
      checkInDate: "11-08-2021",
      checkOutDate: "15-08-2021",
      name: "Saurav",
      email: "saurav@g.com",
      phone: "9540973878",
    },
  },
};

let response = {
  razorpay_payment_id: "1",
  razorpay_order_id: "12",
};
