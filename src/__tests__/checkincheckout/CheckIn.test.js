import React from "react"; 
import Adapter from "enzyme-adapter-react-16"; 
import { shallow, configure } from "enzyme"; 
import CheckIn from "../../component/checkin/CheckIn"; 
import axios from "axios"; 
configure({ adapter: new Adapter(), }); 
let wrapper; 
let location = {
    state: { bookingId: 1 } 
}
beforeEach(() => {
     wrapper = shallow(<CheckIn location={location}/>);
})


describe("Testing CheckIn Component", function () {
     it("Testing whether the object is created or not", function () {
          try { 
              let obj = wrapper.instance(); 
            } catch (error) { 
                fail(); 
            } 
        }); 
    it("To test text of div tags on Check In ", function () {
         try {
              let obj = wrapper.instance(); 
              let text = wrapper.find("div").at(1).text(); 
              expect(text).toBe("Check In"); 
            } catch (error) { 
                fail(); 
            } 
        }); 
    it("To count numbers of input tags on Check In ", function () {
         try { let obj = wrapper.instance(); 
            let count = wrapper.find("Input").length; 
            expect(count).toBe(6); 
        } catch (error) {
             fail(); 
            } 
        }); 
    it("To count numbers of button tags on Check In ", function () {
         try {
              let obj = wrapper.instance(); 
              let count = wrapper.find("Button").length; expect(count).toBe(1); 
            } catch (error) {
                 fail(); 
                } 
        }); 
       it("To check the value of firstname in state while entering value in Check In ", function () {
        let object = wrapper.find("Input").at(0); 
        object.simulate("change", { 
            preventDefault: () => {}, 
            target: { name: "firstName", value: "Aniket" }, 
           }); 
           let obj = wrapper.instance(); expect(obj.state.firstName).toBe("Aniket"); 
        }); 
        it("To check the value of lastname in state while entering value in Check In ", function () {
            let object = wrapper.find("Input").at(1); 
            object.simulate("change", { 
                preventDefault: () => {}, 
                target: { name: "lastName", value: "Khedekar" }, 
            }); 
            let obj = wrapper.instance(); expect(obj.state.lastName).toBe("Khedekar"); 
        }); 
        it("To check the value of email in state while entering value in Check In ", function () {
            let object = wrapper.find("Input").at(2); 
            object.simulate("change", { 
                preventDefault: () => {}, 
                target: { name: "email", value: "abc@abc.com" }, 
               }); 
               let obj = wrapper.instance(); expect(obj.state.email).toBe("abc@abc.com"); 
       }); 
      it("To check the value of aadharId in state while entering value in Check In ", function () {
        let object = wrapper.find("Input").at(3); 
        object.simulate("change", { 
            preventDefault: () => {}, 
            target: { name: "aadharId", value: "223412341234" },
           }); 
           let obj = wrapper.instance();
           expect(obj.state.aadharId).toBe("223412341234");
      });
      it("To check the value of invalid aadharId in state while entering value in Check In ", function () {
        let object = wrapper.find("Input").at(3); 
        object.simulate("change", { 
            preventDefault: () => {}, 
            target: { name: "aadharId", value: "1234 12340123" }, 
           }); 
           let obj = wrapper.instance();

          obj.handleSubmit({
              preventDefault : () => {},
          });
          obj =  wrapper.instance();

           expect(obj.state.errors).toStrictEqual({
              email: "Email can't be empty",
              aadharId: 'Invalid Aadhar Number!'
      });

      });
      it("To check the value of checkInDate in state while entering value in Check In ", function () {
        let object = wrapper.find("Input").at(4); 
        object.simulate("change", { 
            preventDefault: () => {}, 
            target: { name: "checkInDate", value: "05/06/1998" }, 
           }); 
           let obj = wrapper.instance(); 
           expect(obj.state.checkInDate).toBe("05/06/1998"); 
      });
      it("To check the value of checkInDate in state while entering value in Check In ", function () {
        let object = wrapper.find("Input").at(5); 
        object.simulate("change", { 
            preventDefault: () => {}, 
            target: { name: "checkInTime", value: "00:00:00" }, 
           }); 
           let obj = wrapper.instance(); 
           expect(obj.state.checkInTime).toBe("00:00:00"); 
      });
      it("To check for empty input feilds", function () {
        let object = wrapper.find("Button").at(0);
        let inputTags = wrapper.find("input");
        // object.simulate("click", {
        //   preventDefault: () => {},
        // });
        object.props().handleClick({
          preventDefault: () => {},
        });
        let obj = wrapper.instance();

    });
    it("To check for empty and invalid input feilds", function () {
        let object = wrapper.find("Button").at(0);
        let inputTags = wrapper.find("Input");
        let objec = wrapper.find("Input").at(2);
            objec.simulate("change", { 
                preventDefault: () => {}, 
                target: { name: "email", value: "abc" }, 
               });
        objec = wrapper.find("Input").at(2);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "email", value: "abc" },
        });
        object.props().handleClick({
          preventDefault: () => {},
        });
        let obj = wrapper.instance();

    });
    it("To check for  successful axios call", async function () {
        axios.post = jest.fn()
        let obj = wrapper.instance();

        let objec = wrapper.find("Input").at(0);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "firstName", value: "Aniket" },
        });
        objec = wrapper.find("Input").at(1);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "lastName", value: "Khedekar" },
        });
        objec = wrapper.find("Input").at(2);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "email", value: "abc@abc.com" },
        });
        objec = wrapper.find("Input").at(3);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "aadharId", value: "234531231234" },
        });
        objec = wrapper.find("Input").at(4);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "checkInDate", value: "05/06/1998" },
        });
        objec = wrapper.find("Input").at(5);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "checkInTime", value: "00:00:00" },
        });
         axios.post.mockImplementationOnce(() =>
            Promise.resolve()
        );

        obj.handleSubmit({
            preventDefault : () => {},
        });
        obj = await wrapper.instance();

        // expect(obj.state.successMsg).toBe("CheckIn status updated successfully")
    });
    it("To check for failure axios call", async function () {
        axios.post = jest.fn()
        let obj = wrapper.instance();

        
        let objec = wrapper.find("Input").at(0);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "firstName", value: "Aniket" },
        });
        objec = wrapper.find("Input").at(1);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "lastName", value: "Khedekar" },
        });
        objec = wrapper.find("Input").at(2);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "email", value: "abc@abc.com" },
        });
        objec = wrapper.find("Input").at(3);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "aadharId", value: "234531231234" },
        });
        objec = wrapper.find("Input").at(4);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "checkInDate", value: "05/06/1998" },
        });
        objec = wrapper.find("Input").at(5);
        objec.simulate("change", {
            preventDefault: () => {},
            target: { name: "checkInTime", value: "00:00:00" },
        });
        axios.post.mockImplementationOnce(() =>
            Promise.reject()
        );

        obj.handleSubmit({
            preventDefault : () => {},
        });

        obj = await wrapper.instance();
        obj = await wrapper.instance();
        expect(obj.state.failureMsg).toBe("CheckIn status update failed. Try Again! ")

    });
});