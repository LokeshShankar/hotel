import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure, mount } from 'enzyme'
// import DropdownMenu from '../component/ClassMenu'
import DropdownMenu from '../../component/utility/ClassMenu'



import '../../setupTests'


configure({
    adapter : new Adapter()
});

describe('Testing Dropdown Menu component' , function(){

  it('Testing whether the Dropdown Menu component is mount or not' , function(){
      try {
          const wrapper = shallow(<DropdownMenu></DropdownMenu>)
      } catch (error) {
          fail()
      }
  })

  it('Testing whether the Dropdown Menu object is created or not' , function(){
    try {
        const wrapper = shallow(<DropdownMenu></DropdownMenu>)
        let obj = wrapper.instance();
    } catch (error) {
        fail()
    }
  })

  it('Testing the initial state values of dropdown ' , function(){
    try {
        const wrapper = shallow(<DropdownMenu></DropdownMenu>)
        let obj = wrapper.instance();
        let state_val = obj.state.value;
        expect(state_val).toBe("");
    } catch (error) {
        fail()
    }
  })

  it('Testing state value of dropdown' , function(){
    try {
        const wrapper = shallow(<DropdownMenu></DropdownMenu>)
        let obj = wrapper.instance();
        obj.setState({value : "mock value"});

        let value = obj.state.value;
        expect(value).toBe("mock value");
    } catch (error) {
        fail()
    }
  })

  

});