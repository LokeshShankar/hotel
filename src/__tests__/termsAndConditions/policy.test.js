import Policy from "../../component/TermsAndConditions/policy";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
  adapter: new Adapter(),
});
let wrapper = null;
describe("Testing Policy component", function () {
    // Fails beacuse of initial value for props (Array variable not initialized)
    
  
    it("Testing whether the component mounts with props", function () {
      wrapper = shallow(<Policy  />);
    });
  
    // Throws warning for not having unique keys in each child in the list
    it("Testing whether the h1 is correct", function () {
      wrapper = shallow(<Policy />);
      const received = wrapper.find("h1").length;
      expect(received).toBe(1);
    });
    it("Testing whether the h1 is correct", function () {
        wrapper = shallow(<Policy />);
        const received = wrapper.find("h1").length;
        expect(received).toBe(1);
      });
    it("Testing whether the h2 is correct", function () {
    wrapper = shallow(<Policy />);
    const received = wrapper.find("h2").length;
    expect(received).toBe(9);
    });
    it("Testing whether the p is correct", function () {
    wrapper = shallow(<Policy />);
    const received = wrapper.find("p").length;
    expect(received).toBe(27);
    });
  });
  