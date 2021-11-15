import React from "react";
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure, mount } from "enzyme";
import Message from "../../component/utility/Message";
import '../../setupTests'
configure({
    adapter : new Adapter()
});
describe('Testing Message component' , function(){
    it('Testing whether the component is mount or not' , function(){
        try {
            const wrapper = shallow(<Message />)
        } catch (error) {
            fail()
        }
    })
    it('Testing whether the object is created or not' , function(){
        try {
            const wrapper = shallow(<Message />)
            let obj = wrapper.instance();
        } catch (error) {
            fail()
        }
    })

    it('Count no of button tag' , function(){
        try {
            const wrapper = shallow(<Message />)
            let len = wrapper.find('p').length
            expect(len).toBe(1)
        } catch (error) {
            fail()
        }
    })

})