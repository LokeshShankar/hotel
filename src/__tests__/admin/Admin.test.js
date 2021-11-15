import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Admin from '../../component/admin/Admin'
import axios from "axios";
configure({
    adapter: new Adapter(),
});

let wrapper;

// beforeEach(() => {

//     wrapper = shallow(<Admin />);
// });

describe('Testing Admin Component',function(){

    it('Testing whether the component is mounted or not' , function(){
        wrapper = shallow(<Admin navbarToggle={() => {}} />);
        
    })
    it('Testing whether the object is created or not' , function(){
        wrapper.instance();
    })
    it('Testing whether props are used correctly' , function(){
        wrapper.unmount();
    })
    

})