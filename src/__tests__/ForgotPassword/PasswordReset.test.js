import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure } from 'enzyme'
import PasswordReset from '../../component/ForgotPassword/PasswordReset'
import axios from 'axios'

configure({
    adapter : new Adapter()
});


describe('Testing the Password Reset Page',function(){
    let wrapper;
    beforeEach(()=> {
        wrapper=shallow(<PasswordReset/>)
    })
    
    
    it('Testing the object Creation',function(){
        try{
            let obj=wrapper.instance()
        }catch(error){
            fail()
        }
    })
    it('initially an empty user state', ()=> {
        let actualuserstate=wrapper.state('user')
        let expecteduserstate={ 
            Email:'',
            password: '',
            confirmpassword:'',
            otp:''
        }
        expect(actualuserstate).toEqual(expecteduserstate);
    })
    it('checking the inputs for different id ',function(){
        expect(wrapper.find('input#uname')).toHaveLength(1);
        expect(wrapper.find('input#password')).toHaveLength(2);
        expect(wrapper.find('input#otp')).toHaveLength(1);

    })
    it('checking the placeholders ',function(){
        let actualPlaceholderForEmailinput=wrapper.find("input").at(0).getElement().props.placeholder;
        let expectedPlaceholderForEmailinput='Email';
        let actualPlaceholderForPasswordinput=wrapper.find("input").at(1).getElement().props.placeholder;
        let expectedPlaceholderForPasswordinput='Password';
        let actualPlaceholderForConfirmPasswordinput=wrapper.find("input").at(2).getElement().props.placeholder;
        let expectedPlaceholderForConfirmPasswordinput='Confirm Password';
        let actualPlaceholderForOtpinput=wrapper.find("input").at(3).getElement().props.placeholder;
        let expectedPlaceholderForOtpinput='OTP';
        expect(actualPlaceholderForEmailinput).toBe(expectedPlaceholderForEmailinput); 
        expect(actualPlaceholderForPasswordinput).toBe(expectedPlaceholderForPasswordinput);
        expect(actualPlaceholderForConfirmPasswordinput).toBe(expectedPlaceholderForConfirmPasswordinput);
        expect(actualPlaceholderForOtpinput).toBe(expectedPlaceholderForOtpinput);
    })
    it('checking the input tags content',()=>{
        wrapper.find('input[name="Email"]').simulate('change', {target: {name: 'Email', value: 'helloworld@gmail.com'}});
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'password1'}});
        wrapper.find('input[name="confirmpassword"]').simulate('change', {target: {name: 'confirmpassword', value: 'confirmpassword'}});
        wrapper.find('input[name="otp"]').simulate('change', {target: {name: 'otp', value: 'otp', value: '4438'}});
        let actualuserstate=wrapper.state('user')
        let expecteduserstate={ 
            Email : 'helloworld@gmail.com',
            password: 'password1',
            confirmpassword: 'confirmpassword',
            otp:'4438'
        }
        expect(actualuserstate).toEqual(expecteduserstate);
    })
    it('check when the password and confirm password doesnot matches',async ()=>{
        wrapper.find('input[name="Email"]').simulate('change', {target: {name: 'Email', value: 'helloworld@gmail.com'}});
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'password1'}});
        wrapper.find('input[name="confirmpassword"]').simulate('change', {target: {name: 'confirmpassword', value: 'confirmpassword'}});
        wrapper.find('input[name="otp"]').simulate('change', {target: {name: 'otp', value: 'otp'}});
        
        axios.post = jest.fn()
            await axios.post.mockImplementationOnce();
            let obj = wrapper.instance();
            await obj.handleSubmit({preventDefault : () => {}});
            expect(obj.state.errorMessage).toBe("Password Doesn't matches");
    })
    it('check when the email is not right',async ()=>{
        wrapper.find('input[name="Email"]').simulate('change', {target: {name: 'Email', value: 'helloworld'}});
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'password1'}});
        wrapper.find('input[name="confirmpassword"]').simulate('change', {target: {name: 'confirmpassword', value: 'confirmpassword'}});
        wrapper.find('input[name="otp"]').simulate('change', {target: {name: 'otp', value: 'otp'}});
        
        axios.post = jest.fn()
            await axios.post.mockImplementationOnce();
            let obj = wrapper.instance();
            await obj.handleSubmit({preventDefault : () => {}});
            expect(obj.state.errorMessage).toBe("Enter a valid Email Id");
    })
    it('checking the type of input tags ', ()=> {
        let actualtypeForEmailinput=wrapper.find("input").at(0).getElement().props.type;
        let expectedtyperForEmailinput='email';
        let actualtypeForPasswordinput=wrapper.find("input").at(1).getElement().props.type;
        let expectedtyperForPasswordinput='password';
        let actualtypeForConfirmPasswordinput=wrapper.find("input").at(2).getElement().props.type;
        let expectedtyperForConfirmPasswordinput='password';
        let actualtypeForOtpnput=wrapper.find("input").at(3).getElement().props.type;
        let expectedtyperForOtpinput='text';
        
        expect(actualtypeForEmailinput).toBe(expectedtyperForEmailinput);
        expect(actualtypeForPasswordinput).toBe(expectedtyperForPasswordinput);
        expect(actualtypeForConfirmPasswordinput).toBe(expectedtyperForConfirmPasswordinput); 
        expect(actualtypeForOtpnput).toBe(expectedtyperForOtpinput);  
    })
    it('checking the name of input tags ', ()=> {
        let actualnameForEmailinput=wrapper.find("input").at(0).getElement().props.name;
        let expectednameForEmailinput='Email';
        let actualnameForPasswordinput=wrapper.find("input").at(1).getElement().props.name;
        let expectednameForPasswordinput='password';
        let actualnameForConfirmPasswordinput=wrapper.find("input").at(2).getElement().props.name;
        let expectednameForConfirmPasswordinput='confirmpassword';
        let actualnameForOtpinput=wrapper.find("input").at(3).getElement().props.name;
        let expectednameForOtpinput='otp';

        expect(actualnameForEmailinput).toBe(expectednameForEmailinput);
        expect(actualnameForPasswordinput).toBe(expectednameForPasswordinput);
        expect(actualnameForConfirmPasswordinput).toBe(expectednameForConfirmPasswordinput);
        expect(actualnameForOtpinput).toBe(expectednameForOtpinput);
    })
    it('Checking the button count in form', ()=> {
        expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    })
    it('Email Credentials check', async () => {
        axios.post = jest.fn()
        await axios.post.mockImplementationOnce();
            let obj = wrapper.instance();
            await obj.handleSubmit({preventDefault : () => {}});
            expect(obj.state.errorMessage).toBe("Enter a valid Email Id");
    })
    it('Testing the number of input tags',function(){
        try{    let count=wrapper.find('input').length
            expect(count).toBe(4);
         }catch(error){
             fail()
         }
    }) 
    it('Testing the number of heading tags',function(){
        try{    let count=wrapper.find('h2').length
            expect(count).toBe(1);
         }catch(error){
             fail()
         }
    }) 
    
    it('Testing the content of heading tag',function(){
       let content=wrapper.find('h2').at(0).text()
       expect(content).toBe("Reset Your Password") 
    }) 
})