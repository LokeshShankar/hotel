import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure, mount } from 'enzyme'
import Radio_ from '../../component/utility/Radio'

import '../../setupTests'


configure({
    adapter : new Adapter()
});

describe('Testing Radio Button component' , function(){

  it('Testing whether the Radio component is mount or not' , function(){
      try {
          const wrapper = shallow(<Radio_></Radio_>)
      } catch (error) {
          fail()
      }
  })

  it('Testing whether the radio object is created or not' , function(){
    try {
        const wrapper = shallow(<Radio_></Radio_>)
        let obj = wrapper.instance();
    } catch (error) {
        fail()
    }
  })

  it('Testing the initial state values of radio ' , function(){
    try {
        const wrapper = shallow(<Radio_></Radio_>)
        let obj = wrapper.instance();
        let state_val = obj.state.radio_value;
        expect(state_val).toBe("");
    } catch (error) {
        fail()
    }
  })

  it('Testing state value of radio' , function(){
    try {
        const wrapper = shallow(<Radio_></Radio_>)
        let obj = wrapper.instance();
        obj.setState({radio_value : "mock value"});

        let value = obj.state.radio_value;
        expect(value).toBe("mock value");
    } catch (error) {
        fail()
    }
  })
 

});