import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,mount } from "enzyme";
import axios from "axios";
import BookDetails from "../../component/bookingHistory/BookingDetails";
configure({
  adapter: new Adapter(),
});

const userBookDetailsProps = {
    role: "user",
    booking: {
        bookingTime: "2021-08-23T04:23:15.000+00:00",
        booking_id: 28,
        checkInDate: "2021-08-28T00:00:00.000+00:00",
        checkOutDate: "2021-08-29T00:00:00.000+00:00",
        guestCount: 1,
        hotelId: 20,
        hotelName: "Sunset Lodge",
        paymentId: 30,
        roomsBooked: "{'Semi Deluxe':1}",
        status: "Cancelled",
        userId: 13,
    },
    hotelId: 1,
    history: {}
}

const adminBookDetailsProps = {
    role: "admin",
    booking: {
        bookingTime: "2021-08-23T04:23:15.000+00:00",
        booking_id: 28,
        checkInDate: "2021-08-28T00:00:00.000+00:00",
        checkOutDate: "2021-08-29T00:00:00.000+00:00",
        guestCount: 1,
        hotelId: 20,
        hotelName: "Sunset Lodge",
        paymentId: 30,
        roomsBooked: "{'Semi Deluxe':1}",
        status: "Cancelled",
        userId: 13,
    },
    hotelId: 1,
    history: {
        push: jest.fn(),
    },
    bookingtype:"currentbookings"
}

const adminBookDetailsProps2 = {
    role: "admin",
    booking: {
        bookingTime: "2021-08-23T04:23:15.000+00:00",
        booking_id: 28,
        checkInDate: "2021-08-28T00:00:00.000+00:00",
        checkOutDate: "2021-08-29T00:00:00.000+00:00",
        guestCount: 1,
        hotelId: 20,
        hotelName: "Sunset Lodge",
        paymentId: 30,
        roomsBooked: "{'Semi Deluxe':1}",
        status: "Cancelled",
        userId: 13,
    },
    hotelId: 1,
    history: {
        push: jest.fn(),
    },
    bookingtype:"futurebookings"
}

let wrapper;
beforeEach(() => {
    jest.mock("axios");
    wrapper = shallow(<BookDetails {...adminBookDetailsProps}/>);
});

describe("Testing Book Details Component", function () {
    it("Testing whether the object is created or not with user props", function () {
        wrapper = shallow(<BookDetails {...userBookDetailsProps}/>);
        let obj = wrapper.instance();
    });

    it("Testing whether the object is created or not with admin props", function () {
        let obj = wrapper.instance();
    });

    it("Testing add bill button", function () {
        let buttonWrapper = wrapper.find('Button[label="Add Bill"]');
        buttonWrapper.props().handleClick({ preventDefault: () => {} });
    });

    it("Testing all bills button", function () {
        let buttonWrapper = wrapper.find('Button[label="All Bills"]');
        buttonWrapper.props().handleClick({ preventDefault: () => {} });
    });

    it("Testing check in button", function () {
        wrapper = shallow(<BookDetails {...adminBookDetailsProps2}/>);
        let buttonWrapper = wrapper.find('Button[label="Check-In"]');
        buttonWrapper.props().handleClick({ preventDefault: () => {} });
    });

    it("Testing check out button", function () {
        let buttonWrapper = wrapper.find('Button[label="Check-Out"]');
        buttonWrapper.props().handleClick({ preventDefault: () => {} });
    });
  
}); 