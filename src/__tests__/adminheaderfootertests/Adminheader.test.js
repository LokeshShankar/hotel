import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow,configure} from 'enzyme'
import Adminheader from '../../component/adminheaderfooter/Adminheader';

configure({
    adapter : new Adapter()
});

let  wrapper
beforeAll( () => {
    wrapper= shallow(<Adminheader />)
});

describe('Testing Header Component',function(){

    it('Testing whether the object is created or not' , function(){
        try {
            let obj = wrapper.instance();
        } catch (error) {
            fail()
        }
    })

    it('To count numbers of header tags' , function(){
        try {
            let count=wrapper.find('header').length
            expect(count).toBe(1)
        } catch (error) {
            fail()
        }
    })

    it('To count numbers of Navbar component' , function(){
        try {
            let count=wrapper.find('Adminnavbar').length
            expect(count).toBe(1)
        } catch (error) {
            fail()
        }
    })


})