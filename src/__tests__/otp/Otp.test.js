import {configure, shallow} from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import axios from 'axios'
import OTPBox from '../../component/otp/Otp'

configure({
    adapter: new Adapter()
});

let wrapper;

let location = {
    state: {email: 'psiasde@gmail.com'}
}

describe('Otp component check ', () => {

    it('Testing whether the component mounts or not', function () {
        wrapper = shallow(<OTPBox location={location}/>)
    });

    let jwttoken1 = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFuaWtldEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Mjg3NDg5NTgsImV4cCI6MTYyODc0OTk1OH0.iyQJEa8w8RbqPEihW_PbAfGuEitHwjPdzAepDh3P4QU';
    let jwttoken2 = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFuaWtldEBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTYyODc0ODk1OCwiZXhwIjoxNjI4NzQ5OTU4fQ.eJiV7xkP0h8GTpAgZyUm9cCpc6vFWht4iJhhkAudF38';


    it('should have a p tag with text', () => {

        // expect(wrapper.find('h1').at(0).text()).toBe('Enter the OTP ');
        expect(wrapper.find('div')).toHaveLength(10);
    });

    it('should have a button component ', () => {

        expect(wrapper.find('button')).toHaveLength(3);
    });

    it('should have input for OTP ', () => {

        expect(wrapper.find('input')).toHaveLength(4);
    });

    it('check initial states of component', () => {

        expect(wrapper.find('input[name="otp"]').at(0).prop('value')).toBe('');
        expect(wrapper.find('input[name="otp"]').at(1).prop('value')).toBe('');
        expect(wrapper.find('input[name="otp"]').at(2).prop('value')).toBe('');
        expect(wrapper.find('input[name="otp"]').at(3).prop('value')).toBe('');

    });

    it('on change of value in the input field, the state should be updated', () => {

        wrapper.find('input[name="otp"]').at(0).simulate('change', {
            target: {value: '1'}
        });
        const received = wrapper.find('input[name="otp"]').at(0).prop('value')
        const expected = '1'
        expect(received).toBe(expected);

    });

    it('check click on clear otp clears input field ', () => {

        wrapper.find('input[name="otp"]').at(0).simulate('change', {target: {value: '1',},});
        wrapper.find('input[name="otp"]').at(1).simulate('change', {target: {value: '2',},});
        wrapper.find('input[name="otp"]').at(2).simulate('change', {target: {value: '2',},});
        wrapper.find('input[name="otp"]').at(3).simulate('change', {target: {value: '3',},});

        expect(wrapper.find('input[name="otp"]').at(2).prop('value')).toBe('2');
        wrapper.find('button').at(0).simulate('click')
        expect(wrapper.find('input[name="otp"]').at(0).prop('value')).toBe('');
    });

    it('check text of verify button ', () => {
        const received = wrapper.find('button').at(1).text()
        const expected = 'Verify OTP'
        expect(received).toBe(expected);
    })

    it('check onfocus functionality', () => {
        const input = wrapper.find('input').at(0)
        const events = {
            target:
                {
                    select: () => {
                    }
                }
        }
        input.props().onFocus(events)
    })

    it('check when input is not number', () => {
        wrapper.find('input[name="otp"]').at(2).simulate('change', {target: {value: ''}});
        const input = wrapper.find('input').at(0)
        const received = input.props().onChange({target: {value: '?'}})
        expect(received).toEqual(false);

    })

    it('check click on verify incorrect otp', async () => {

        axios.post = jest.fn()
        await axios.post.mockImplementationOnce(() =>
            Promise.reject()
        );
        const events = {
            preventDefault: () => {
            }
        }
        const button = wrapper.find('button').at(1)
        await button.props().onClick(events)
        const received = wrapper.find('p').at(0).text()
        const expected = 'Incorrect OTP!'
        expect(received).toBe(expected);
    });

    it('check click on verify correct otp and role admin', async () => {

        axios.post = jest.fn()
        await axios.post.mockImplementation(() =>
            Promise.resolve({data: jwttoken1})
        );
        const events = {
            preventDefault: () => {
            }
        }
        const button = wrapper.find('button').at(1)
        await button.props().onClick(events)
        expect(wrapper.find('p').at(0).text()).toBe('Authenticated!');
        const button1 = wrapper.find('button').at(2)
        await button1.props().onClick(events)
    });
    

    it('check click on verify correct otp and role user', async () => {

        axios.post = jest.fn()
        await axios.post.mockImplementationOnce(() =>
            Promise.resolve({data: jwttoken2})
        );
        const events = {
            preventDefault: () => {
            }
        }
        const button = wrapper.find('button').at(1)
        await button.props().onClick(events)
        expect(wrapper.find('p').at(0).text()).toBe('Authenticated!');
    });

})