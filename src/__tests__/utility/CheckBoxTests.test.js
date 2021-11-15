import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure, mount } from 'enzyme'
import Check_ from '../../component/utility/Check'


import '../../setupTests'


configure({
    adapter : new Adapter()
});

describe('Testing CheckBox component Mounting' , function(){
    
  it('Testing whether the Check component is mount or not' , function(){
      try {
          const wrapper = shallow(<Check_></Check_>)
      } catch (error) {
          fail()
      }
  })

  it('Testing whether the checkbox object is created or not' , function(){
    try {
        const wrapper = shallow(<Check_></Check_>)
        let obj = wrapper.instance();
    } catch (error) {
        fail()
    }
  })

  it('Testing the initial state values of checkbox' , function(){
    try {
        const wrapper = shallow(<Check_></Check_>)
        let obj = wrapper.instance();
        let state_val = obj.state.isChecked;
        expect(state_val).toBe(false);
    } catch (error) {
        fail()
    }
  })

  it('Testing state value of checkbox' , function(){
    try {
        const wrapper = shallow(<Check_></Check_>)
        let obj = wrapper.instance();
        obj.setState({isChecked : true});

        let value = obj.state.isChecked;
        expect(value).toBe(true);
    } catch (error) {
        fail()
    }
  })

  it('Testing checkbox toggle' , function(){
    const wrapper = shallow(<Check_></Check_>)
    let obj = wrapper.instance();
    let checked = !obj.state.isChecked;
    obj.onChange({ target: { type: 'checkbox', name: 'isChecked', checked: checked } });

    let value = obj.state.isChecked;
    expect(value).toBe(checked);
  })

});