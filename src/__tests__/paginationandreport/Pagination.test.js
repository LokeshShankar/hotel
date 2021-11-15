//const React =require("react");
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow,configure,mount } from 'enzyme'
import Pagination from '../../component/paginationandreport/Pagination'
import ReactPaginate from 'react-paginate'
import MockComponent from '../../__mocks__/paginationandreport/mockcomponent'

configure({
    adapter:new Adapter()
});

describe('Testing Pagination component',function(){



    it('Testing whether Pagination Component is marked or not',function(){
        const wrapper=shallow(<Pagination data={["Hello","Helloo","Hello","Hello","Hello"]}><MockComponent/></Pagination>)
    })

    it('Testing whether the object is created or not' , function(){
        const wrapper = shallow(<Pagination data={[]}><MockComponent/></Pagination>)
        let obj = wrapper.instance();
    })
    
    it('To check no of inactive buttons for this data' , function(){
        let data=[{id:1,name:"s",email:"s",body:"z"}]
        const wrapper2=shallow(<Pagination data={data}><MockComponent/></Pagination>)
        let obj=wrapper2.instance()
        let len=wrapper2.find('.pagination').length;
        expect(len).toBe(0)
    })


    it('To check if React Paginate is marked or not' , function(){
        let data=[{id:1,name:"s",email:"s",body:"z"}]
        const wrapper2=shallow(<ReactPaginate containerClassName={"pagination"}/>)
    })

    it('To check if object of react paginate ca be created or not' , function(){
        let data=[{id:1,name:"s",email:"s",body:"z"}]
        const wrapper2=shallow(<ReactPaginate containerClassName={"pagination"}/>)
        let obj=wrapper2.instance()
    })

    it('To test no of classes in React Paginate' , function(){
        let data=[{id:1,name:"s",email:"s",body:"z"}]
        const wrapper2=shallow(<ReactPaginate containerClassName={"pagination"}/>)
        let obj=wrapper2.instance()
        let len=wrapper2.find('.pagination').length;
        expect(len).toBe(1)
    })
   
    it('To check the no of pages for given data' , function(){
        let data=[{id:1,name:"s",email:"s",body:"z"}]
        const wrapper=shallow(<Pagination data={data}><MockComponent/></Pagination>)
        let obj=wrapper.instance()
        let pageCount=obj.state.pageCount
        expect(pageCount).toEqual(1)
    })

    it('To check the no of pages for given data' , function(){
        let data=[
            {id:1,name:"s",email:"s",body:"z"},
            {id:1,name:"s",email:"s",body:"z"},
            {id:1,name:"s",email:"s",body:"z"},
            {id:1,name:"s",email:"s",body:"z"},
            {id:1,name:"s",email:"s",body:"z"},
            {id:1,name:"s",email:"s",body:"z"},
            {id:1,name:"s",email:"s",body:"z"},
            {id:1,name:"s",email:"s",body:"z"},
            {id:1,name:"s",email:"s",body:"z"},
            {id:1,name:"s",email:"s",body:"z"},
            {id:1,name:"s",email:"s",body:"z"}
        ]
        const wrapper=shallow(<Pagination data={data}><MockComponent/></Pagination>)
        let obj=wrapper.instance()
        let pageCount=obj.state.pageCount
        expect(pageCount).toEqual(2)
    })


    it('To check if perPage is set correctly or not' , function(){
        let data=[
            {id:1,name:"s",email:"s",body:"z"}
        ]
        const wrapper=shallow(<Pagination data={data}><MockComponent/></Pagination>)
        let obj=wrapper.instance()
        let perPage=obj.state.perPage
        expect(perPage).toEqual(10)
    })

    it('To check props of ReactPaginate' , function(){
        let data=[
            {id:1,name:"s",email:"s",body:"z"}
        ]
        const wrapper=shallow(<ReactPaginate marginPagesDisplayed={2}/>)
        let obj=wrapper.instance()
        let perPage=obj.props.marginPagesDisplayed
        let len=wrapper.find('.pagination >.active').length
        expect(len).toBe(0)
    })

    
    
})
