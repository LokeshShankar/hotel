import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import CheckOut from "../../component/checkout/CheckOut";
import axios from "axios";
configure({ adapter: new Adapter(), });
let wrapper;
let booking={bookingId:1}
beforeEach(() => { wrapper = shallow(<CheckOut  location={{state: booking}}/>); });


describe("Testing CheckIn Component", function () {
    it("Testing whether the object is created or not", function () {
        try {
            let obj = wrapper.instance();
        } catch (error) {
            fail();
        } 
    });
    it("To count numbers of input tags on Check Out ", function () {
       let obj = wrapper.instance();
            let count = wrapper.find("Input").length;
            expect(count).toBe(2);
        
    });
    it("To count numbers of button tags on Check Out when submit is not clicked ", function () {
        try {
            let obj = wrapper.instance();
            let count = wrapper.find("Button").length;
            expect(count).toBe(1);
        } catch (error) {
            fail();
        }
    });
    it("To count numbers of button tags on Check Out when submit is clicked ", async function () {
            let obj = wrapper.instance();
            obj.setState({bills : [{
                    "bookingId": 1,
                    "service": {
                        "name": "Breakfast",
                        "price": 100,
                    },
                    "quantity": 5,
                    "discount": 10,
                    "amount": 450
                }]})
            obj = await wrapper.instance();
            let count = wrapper.find("Button").length
            expect(count).toBe(1);

    });
    it("To check the value of checkOutDate in state while entering value in Check Out ", function () {
        let object = wrapper.find("Input").at(0);
        object.simulate("change", {
            preventDefault: () => {},
            target: { name: "checkOutDate", value: "05/06/1998" },
        });
        let obj = wrapper.instance();
        expect(obj.state.checkOutDate).toBe("05/06/1998");
    });
    it("To check the value of checkOutTime in state while entering value in Check Out ", function () {
        let object = wrapper.find("Input").at(1);
        object.simulate("change", {
            preventDefault: () => {},
            target: { name: "checkOutTime", value: "00:00:00" },
        });
        let obj = wrapper.instance();
        expect(obj.state.checkOutTime).toBe("00:00:00");
    });
    it("To check for  successful axios get call on first submit", async function () {
        wrapper.find('Input').at(0).simulate('change', {target : {name: "checkOutDate", value: "05/06/1998"}});
        wrapper.find('Input').at(1).simulate('change', {target: { name: "checkOutTime", value: "00:00:00" }});
        axios.get = jest.fn()
        let obj = wrapper.instance();
        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data:  [{
                    "bookingId": 1,
                    "service": {
                        "name": "Breakfast",
                        "price": 100,
                    },
                    "quantity": 5,
                    "discount": 10,
                    "amount": 450
                }]})
        );
        obj.handleSubmit({
            preventDefault : () => {},
        });
        obj = await wrapper.instance();
        expect(obj.state.bills).toStrictEqual([{
            "bookingId": 1,
            "service": {
                "name": "Breakfast",
                "price": 100,
            },
            "quantity": 5,
            "discount": 10,
            "amount": 450
        }])
    });

    it("To check for  failure axios get call", async function () {
        wrapper.find('Input').at(0).simulate('change', {target : {name: "checkOutDate", value: "05/06/1998"}});
        wrapper.find('Input').at(1).simulate('change', {target: { name: "checkOutTime", value: "00:00:00" }});
        axios.get = jest.fn()
        let obj = wrapper.instance();
        axios.get.mockImplementationOnce(() =>
            Promise.reject()
        );
        obj.handleSubmit({
            preventDefault : () => {},
        });

        obj = await wrapper.instance();
        obj = await wrapper.instance();
        expect(obj.state.errMsg).toBe("Network Error Try Again!")
    });


    it("To check for  successful axios post call on paysubmit", async function () {
        axios.get = jest.fn()
        axios.post=jest.fn()
        let obj = wrapper.instance();
        axios.get.mockImplementationOnce(() =>
            Promise.resolve()
        );
        axios.post.mockImplementationOnce(() =>
            Promise.resolve()
        );
        obj.handleSubmit({
            preventDefault : () => {},
        });
        obj.setState({bills : [{
                "bookingId": 1,
                "service": {
                    "name": "Breakfast",
                    "price": 100,
                },
                "quantity": 5,
                "discount": 10,
                "amount": 450
            }]})
        obj = await wrapper.instance();
        obj.paySubmit({
            preventDefault : () => {},
        });
        obj = await wrapper.instance();
        expect(obj.state.isPaid).toBe(true)
        expect(obj.state.totalAmount).toBe(450)
        expect(wrapper.find('button').at(0).text()).toBe("Proceed")
    });
    it("To check for  failure axios post call on paysubmit", async function () {
        axios.get = jest.fn()
        axios.post=jest.fn()
        let obj = wrapper.instance();
        axios.get.mockImplementationOnce(() =>
            Promise.resolve()
        );
        axios.post.mockImplementationOnce(() =>
            Promise.reject()
        );
        obj.handleSubmit({
            preventDefault : () => {},
        });
        obj = await wrapper.instance();
        obj.paySubmit({
            preventDefault : () => {},
        });
        obj = await wrapper.instance();
        obj = await wrapper.instance();
        expect(obj.state.failureMsg).toBe("Failed to update Checkout status !")
    });

});