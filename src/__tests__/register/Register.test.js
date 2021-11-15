import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import Register from "../../component/register/Register";
import RegisterCard from "../../component/register/RegisterCard";

configure({
  adapter: new Adapter(),
});

let wrapper;

describe("Testing Register Component", function () {
  it("Testing whether the object is created or not", function () {
    wrapper = shallow(<Register></Register>);
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("To count the number of RegisterCard Component", function () {
    let count = wrapper.find(RegisterCard).length;
    expect(count).toBe(1);
  });
  it("To check if store is subscribed", function () {
    let count = wrapper.find(Provider).length;
    expect(count).toBe(1);
  });
});
