import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow,configure,mount } from 'enzyme'

import Report from '../../component/paginationandreport/Report'
import ReactToPrint from 'react-to-print'

configure({
    adapter:new Adapter()
});

describe('Testing Pagination component',function(){



    it('Testing whether Report  is marked or not',function(){
        try {
            let data={
                id:"u11",
                name:"Name1",
                hotel:"Hotel1"
            }
            const wrapper=shallow(<Report data={data}/>)
        } catch (error) {
            fail
        }
    })




    it('Testing whether ReactToPrint is marked or not',function(){
        try {
           let data={
           id:"u11",
           name:"Name1",
           hotel:"Hotel1"
            }
           const wrapper=shallow(<ReactToPrint />)
       } catch (error) {
           fail
       }
   })

        it('Testing whether we can create an object of ReactToPrint',function(){
            try {
            let data={
            id:"u11",
            name:"Name1",
            hotel:"Hotel1"
                }
            const wrapper=shallow(<ReactToPrint />)
            let obj=wrapper.instance()
        } catch (error) {
            fail
        }
    })

        it('Testing whether data is passed correctly to Report',function(){
            try {
                let data={
                    id:"u11",
                    name:"Name1",
                    hotel:"Hotel1"
                }
                const wrapper=shallow(<Report data={data}/>)
                let obj=wrapper.instance()
                expect(data).toEqual(obj.props.data)
            } catch (error) {
                fail
            }
        })
   
    

})
