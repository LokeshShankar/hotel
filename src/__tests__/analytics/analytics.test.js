import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Analytics from "../../component/analytics/analytics"
import axios from "axios";
import jwt_decode from "jwt-decode";
configure({ adapter: new Adapter(), });
let wrapper;

beforeEach(() => { wrapper = shallow(<Analytics />); });
jest.mock('jwt-decode', () => () => ({
    "email": "aritramustafi56@gmail.com",
    "role": "admin",
    "iat": 1628748958,
    "exp": 1628749958
}))

describe("Testing Analytics Component",function  () {
    it("Testing whether the object is created or not", function () {
        try {
            let obj = wrapper.instance();
        } catch (error) {
            fail();
        }
    });
    it("To count numbers of input tags on Analytics ",  function() {
        let obj = wrapper.instance();
        let count = wrapper.find("Input").length;
        expect(count).toBe(2);

    });
    it("To count numbers of button tags on Analytics", function () {
        try {
            let obj = wrapper.instance();
            let count = wrapper.find("Button").length;
            expect(count).toBe(1);
        } catch (error) {
            fail();
        }
    });
    it("To check the value of fromDate in state while entering value in Input", function () {
        let object = wrapper.find("Input").at(0);
        object.simulate("change", {
            preventDefault: () => {},
            target: { name: "fromDate", value: "05/06/2021" },
        });
        let obj = wrapper.instance();
        expect(obj.state.fromDate).toBe("05/06/2021");
        expect(obj.state.email).toBe("aritramustafi56@gmail.com");
    });
    it("To check the value of toDate in state while entering value in Input ", function () {
        let object = wrapper.find("Input").at(1);
        object.simulate("change", {
            preventDefault: () => {},
            target: { name: "toDate", value: "05/06/2021" },
        });
        let obj = wrapper.instance();
        expect(obj.state.toDate).toBe("05/06/2021");
    });
    it("To check for  successful axios get calls ", async function () {
        wrapper.find('Input').at(0).simulate('change', {preventDefault: () => {},target : {name: "fromDate", value: "05/06/2021"}});
        wrapper.find('Input').at(1).simulate('change', {preventDefault: () => {},target: { name: "toDate", value: "05/06/2021" }});
        axios.all = jest.fn()
        let obj = wrapper.instance();
        axios.all.mockImplementationOnce(() =>
            Promise.resolve([{data: "Testing Check1" },
                {data: "Testing Check3"}])
        );
        wrapper.find('Button').dive().props().onClick();
        obj = await wrapper.instance();
        expect(wrapper.state()).toStrictEqual( {
                toDate: '05/06/2021',
                fromDate: '05/06/2021',
                email: 'aritramustafi56@gmail.com',
                responseAmountOfHotelOfAdminOverInterval: 'Testing Check1',
                responseAllBookingsCountForHotels: 'Testing Check3',
                errMsg: ''
            }
        )
    });
    // it("To check for  failure axios get call ", async function () {
    //     wrapper.find('Input').at(0).simulate('change', {preventDefault: () => {},target : {name: "fromDate", value: "05/06/2021"}});
    //     wrapper.find('Input').at(1).simulate('change', {preventDefault: () => {},target: { name: "toDate", value: "05/06/2021" }});
    //     axios.all = jest.fn()
    //     let obj = wrapper.instance();
    //     axios.all.mockImplementation(() =>
    //         Promise.reject([{data: "Testing Check1" },
    //             {data: "Testing Check3"}])
    //     );
    //     wrapper.find('Button').dive().props().onClick();
    //     obj = await wrapper.instance();
    //     obj = await wrapper.instance();
    //     expect(obj.state.errMsg).toBe("Network Error!! Try Again.");
    // });

});