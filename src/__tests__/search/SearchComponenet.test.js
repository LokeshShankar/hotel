import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure, mount } from 'enzyme'
import '../../setupTests.js'
import SearchBar from '../../component/search/SearchBar';
import UserLandingPage from '../../component/userlandingpage/userlandingpage.jsx';

configure({
    adapter: new Adapter()
});
let wrapper;

beforeEach(() => {
    const wrapper1 = shallow(<UserLandingPage></UserLandingPage>)
            let obj2 = wrapper1.instance();
            let obj1 = {
                searchState: {
                    location: "",
                    startDate: "",
                    endDate: "",
                    adults: 1,
                    children: 0,
                    rooms: 1,
                  }
            }
            wrapper = shallow(<SearchBar searchState={obj1.searchState} setData={obj2.setData} setCheckInDate= {obj2.setCheckInDate} setCheckOutDate={obj2.setCheckOutDate} setAdults={obj2.setAdults} setChildren={obj2.setChildren} setRooms={obj2.setRooms} search={obj2.search}/>)
});
describe('Testing SearchBar component', function () {

    it('Testing whether the component is mount or not', function () {
        try {
            
            let obj = wrapper.instance();
        } catch (error) {
            fail()
        }
    })
    it('To count the number of input tags', function () {
        try {
            
            let len = wrapper.find('Input').length
            expect(len).toBe(5)
        } catch (error) {
            fail()
        }
    })
    it('To count the number of button tags', function () {
        try {
            
            let len = wrapper.find('Button').length
            expect(len).toBe(1)
        } catch (error) {
            fail()
        }
    })
    it('Testing the initial state values ', function () {
        try {
            
            let obj = wrapper.instance();
            let location = obj.props.searchState.location;
            let startDate = obj.props.searchState.startDate;
            let endDate = obj.props.searchState.endDate;
            let adults = obj.props.searchState.adults;
            let children = obj.props.searchState.children;
            let rooms = obj.props.searchState.rooms;
            expect(location).toBe("");
            expect(startDate).toBe("");
            expect(endDate).toBe("");
            expect(adults).toBe(1);
            expect(children).toBe(0);
            expect(rooms).toBe(1);
        } catch (error) {
            fail()
        }
    })
    
})