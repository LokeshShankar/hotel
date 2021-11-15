import React from "react";
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure, mount } from "enzyme";
import Button from "../../component/utility/Button";
import '../../setupTests'
import { BTN_SIZES, BTN_STYLES } from "../../component/utility/Constant";
configure({
    adapter : new Adapter()
});

let styles = [];
let sizes = [];

describe('Testing Button component' , function(){
    it('Testing whether the component is mount or not' , function(){
        try {
            const wrapper = shallow(<Button />)
        } catch (error) {
            fail()
        }
    })
    it('Testing whether the object is created or not' , function(){
        try {
            const wrapper = shallow(<Button />)
            let obj = wrapper.instance();
        } catch (error) {
            fail()
        }
    })

    it('Count no of button tag' , function(){
        try {
            const wrapper = shallow(<Button />)
            let len = wrapper.find('button').length
            expect(len).toBe(1)
        } catch (error) {
            fail()
        }
    })

    it('Testing whether component mounts with correct props not' , function(){
        const wrapper = shallow(<Button buttonStyle={BTN_STYLES[0]} buttonSize={BTN_SIZES[0]} />)
    })
})