import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow,configure} from 'enzyme'
import Header from '../../component/headerandfooter/Header'

configure({
    adapter : new Adapter()
});

let  wrapper
beforeAll( () => {
    wrapper= shallow(<Header />)
});

describe('Testing Header Component',function(){


    it('To count numbers of header tags' , function(){
        try {
            let count=wrapper.find('header').length
            expect(count).toBe(1)
        } catch (error) {
            fail()
        }
    })

    it('To count numbers of Navbar compoent' , function(){
        try {
            let count=wrapper.find('Navbar').length
            expect(count).toBe(1)
        } catch (error) {
            fail()
        }
    })


})