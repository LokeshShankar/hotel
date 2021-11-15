import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  AddressForm,
  mapStateToProps,
  mapDispatchToProps,
} from "../../component/register/AddressForm";
import { Input } from "../../component/utility/Input";

configure({
  adapter: new Adapter(),
});

let wrapper;
let errorMsg = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  yearOfBirth: "",
  address: "",
  pincode: "",
  city: "",
};
describe("Testing AddressForm Component", function () {
  it("Testing whether the object is created or not", function () {
    wrapper = shallow(<AddressForm errorMsg=""></AddressForm>);
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("Testing number of Input Feilds", function () {
    try {
      let obj = wrapper.find(Input).length;
      expect(obj).toBe(3);
    } catch (error) {
      fail();
    }
  });
  it("Testing Input Feilds", function () {
    try {
      let obj = wrapper.find(Input);
      expect(obj.at(0).props().label).toBe("Address *");
      expect(obj.at(1).props().label).toBe("City *");
      expect(obj.at(2).props().label).toBe("Pin Code *");
    } catch (error) {
      fail();
    }
  });

  it("Testing Redux State to Props", function () {
    let mockState = { address: "A", pincode: "B", city: "C" };
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
    let mockState = { address: "", pincode: "", city: "" };
    let fillStateData = jest.fn();
    wrapper = shallow(
      <AddressForm
        fillStateData={fillStateData}
        errorMsg=""
        {...mockState}
      ></AddressForm>
    );

    wrapper
      .instance()
      .onInputChange({ target: { name: "address", value: "AAA" } });

    expect(wrapper.state("address")).toBe("AAA");
  });
});
