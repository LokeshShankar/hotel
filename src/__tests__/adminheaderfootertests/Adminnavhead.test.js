import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow,configure } from 'enzyme'
import Adminnavhead from '../../component/adminheaderfooter/Adminnavhead';

configure({
    adapter : new Adapter()
});

let wrapper
beforeAll( () => {
    wrapper= shallow(<Adminnavhead />)
});

describe('Testing Adminnavhead Component',function(){

    it('Testing whether the object is created or not' , function(){
        try {
            let obj = wrapper.instance();
        } catch (error) {
            fail()
        }
    })

    it('To count numbers of div tags' , function(){
        try {
            let count=wrapper.find('div').length
            expect(count).toBe(1)
        } catch (error) {
            fail()
        }
    })
    it('To count numbers of input tag' , function(){
        try {
            let count=wrapper.find('input').length
            expect(count).toBe(1)
        } catch (error) {
            fail()
        }
    })
    it('To count numbers of label tag' , function(){
        try {
            let count=wrapper.find('label').length
            expect(count).toBe(1)
        } catch (error) {
            fail()
        }
    })
    it('To count numbers of Link Tag' , function(){
        try {
            let count=wrapper.find('Link').length
            expect(count).toBe(1)
        } catch (error) {
            fail()
        }
    })

    it('To count numbers i tag ' , function(){
        
            let count=wrapper.find('i').length
            expect(count).toBe(1)
    })

    it('To check classname for div tag ' , function(){
        try {
            let classNamepresent=wrapper.find('div').hasClass('navhead')
            expect(classNamepresent).toBe(true);
        } catch (error) {
            fail()
        }
    })
    it('To check classname for Link tag ' , function(){
        try {
            let classNamepresent=wrapper.find('Link').hasClass('navhead-title')
            expect(classNamepresent).toBe(true);
        } catch (error) {
            fail()
        }
    })
    it('To check classname for label tag ' , function(){
        try {
            let classNamepresent=wrapper.find('label').hasClass('navbar-menu-btn')
            expect(classNamepresent).toBe(true);
        } catch (error) {
            fail()
        }
    })
})