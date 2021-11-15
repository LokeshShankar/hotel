import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  PasswordForm,
  mapStateToProps,
  mapDispatchToProps,
} from "../../component/register/PasswordForm";
import { Input } from "../../component/utility/Input";

configure({
  adapter: new Adapter(),
});

let wrapper;

describe("Testing PasswordForm Component", function () {
  it("Testing whether the object is created or not", function () {
    wrapper = shallow(<PasswordForm errorMsg=""></PasswordForm>);
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("Testing number of Input Feilds", function () {
    try {
      let obj = wrapper.find(Input).length;
      expect(obj).toBe(2);
    } catch (error) {
      fail();
    }
  });
  xit("Testing Input Feilds", function () {
    wrapper = shallow(<PasswordForm errorMsg=""></PasswordForm>);
    let obj = wrapper.find(Input);
    expect(obj.at(0).props().label).toBe("New Password *");
    expect(obj.at(1).props().label).toBe("Confirm Password *");
  });

  it("Testing Redux State to Props", function () {
    let mockState = { password: "", confirmPassword: "" };
    let result = mapStateToProps(mockState);
    expect(result).toStrictEqual(mockState);
  });
  it("Testing Redux dispatch", function () {
    let mockDispatchFun = jest.fn();
    let mockDispatch = {
      fillStateData: (newStateVariable) =>
        mockDispatchFun({
          type: "FILL_DATA",
          payload: newStateVariable,
        }),
    };
    let result = mapDispatchToProps(mockDispatchFun);
    expect(JSON.stringify(result)).toBe(JSON.stringify(mockDispatch));
  });

  it("Testing Redux dispatch function", function () {
    let mockDispatchFun = jest.fn((x) => x.type);
    let result = mapDispatchToProps(mockDispatchFun);
    expect(result.fillStateData(null)).toBe("FILL_DATA");
  });

  it("Testing Input Change", function () {
    let mockState = { password: "", confirmPassword: "" };
    let fillStateData = jest.fn();
    wrapper = shallow(
      <PasswordForm
        fillStateData={fillStateData}
        {...mockState}
        errorMsg=""
      ></PasswordForm>
    );

    wrapper
      .instance()
      .onInputChange({ target: { name: "password", value: "AAA" } });

    expect(wrapper.state("password")).toBe("AAA");
  });
});
