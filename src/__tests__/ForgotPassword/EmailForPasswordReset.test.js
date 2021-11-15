import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure } from 'enzyme'
import EmailForPasswordReset from '../../component/ForgotPassword/EmailForPasswordReset'
import axios from 'axios'

configure({
    adapter : new Adapter()
});

let wrapper
beforeEach(()=> {
    axios.get=jest.fn().mockResolvedValue({data:MOCK_DATA})
    wrapper=shallow(<EmailForPasswordReset/>)
})


describe('Testing the Email for Password Reset Page',function(){
    it('Testing the object Creattion',function(){
        try{
            let obj=wrapper.instance()
        }catch(error){
            fail()
        }
    })
    
    it('should have a h2 tag with text Enter Email',()=>{
        expect(wrapper.find('h2').at(0).text()).toBe('Enter email ');
    });
    it('should have a form component ',()=>{
        expect(wrapper.find('form')).toHaveLength(1);
    });
    it('testing the initial values of state variables',function(){
        let expected={
            email:"",
            errorMessage:""
        }

        expect(expected.email).toEqual(wrapper.state('email'));
        expect(expected.errorMessage).toEqual(wrapper.state('errorMessage'));   
    })
    it('checking the input for email',function(){
        expect(wrapper.find('input#uname')).toHaveLength(1);
    })

    it('checking the placeholders ',function(){
        let actualPlaceholderForEmailinput=wrapper.find("input").at(0).getElement().props.placeholder;
        let expectedPlaceholderForEmailinput='Email';
        expect(actualPlaceholderForEmailinput).toBe(expectedPlaceholderForEmailinput); 
    })
    it('checking the email input tag',()=>{
        wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'helloworld@gmail.com'}});
        let actualuserstate=wrapper.state('email')
        let expecteduserstate={ 
            email : 'helloworld@gmail.com',
        }
        expect(actualuserstate).toEqual(expecteduserstate.email);
    })
    it('checking the type of input tags ', ()=> {
        let actualtypeForEmailinput=wrapper.find("input").at(0).getElement().props.type;
        let expectedtyperForEmailinput='email';
        expect(actualtypeForEmailinput).toBe(expectedtyperForEmailinput);
    })
    it('check when the email is not right',async ()=>{        
        axios.get = jest.fn()
        await axios.get.mockImplementationOnce(() =>
        Promise.reject());
            let obj = wrapper.instance();
            await obj.handleSubmit({preventDefault : () => {}});
            expect(obj.state.errorMessage).toBe("Enter a valid Email Id");
    })
    it('checking the name of input tags ', ()=> {
        let actualnameForEmailinput=wrapper.find("input").at(0).getElement().props.name;
        let expectednameForEmailinput='email';
        expect(actualnameForEmailinput).toBe(expectednameForEmailinput);
    })
    it('Checking the button count in form', ()=> {
        expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    })
    it('Adding  wrong email ', async () => {
        axios.post = jest.fn()
             axios.post.mockResolvedValueOnce({})
            let obj = wrapper.instance();
            obj.handleSubmit({
                preventDefault : () => {},
            });
            obj = await wrapper.instance();
            expect(obj.state.isAuthenticated).toBe(false);
    })
    it('Testing the functionality when user email is wrong',async function(){
                axios.get.mockResolvedValueOnce({data:""})    
                let obj=wrapper.instance()
                await obj.handleSubmit({preventDefault : () => {}})
                expect(obj.state.isAuthenticated).toBe(false);
    })
    it('Testing the number of input tags',function(){
        try{    let count =wrapper.find('input').length
            expect(count).toBe(1);
         }catch(error){
             fail()
         }
    })
    
})

const MOCK_DATA={
    user_id:1,
    first_name:"test",
	last_name:"user",
	address_id:"1",
	email :"testing@gmail.com",
	password:"TEst@123",
	phone :"9828298989",
	year_of_birth:"1999",
	user_group_id:1,
	password_failed_attempts:0
}