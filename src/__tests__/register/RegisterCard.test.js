import axios from "axios";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddressForm from "../../component/register/AddressForm";
import DetailsForm from "../../component/register/DetailsForm";
import PasswordForm from "../../component/register/PasswordForm";
import {
  RegisterCard,
  mapStateToProps,
  mapDispatchToProps,
} from "../../component/register/RegisterCard";
import Button from "../../component/utility/Button";

configure({
  adapter: new Adapter(),
});

let wrapper;

describe("Testing Register Card Component", function () {
  it("Testing whether the object is created or not", function () {
    wrapper = shallow(<RegisterCard></RegisterCard>);
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("Check initial count of DetailsForm, AddressForm and PasswordForm coponent", function () {
    let count1 = wrapper.find(DetailsForm).length;
    expect(count1).toBe(1);
    let count2 = wrapper.find(AddressForm).length;
    expect(count2).toBe(0);
    let count3 = wrapper.find(PasswordForm).length;
    expect(count3).toBe(0);
  });

  it("Check number of Buttons on first form", () => {
    let noOfButtons = wrapper.find(Button).length;
    expect(noOfButtons).toBe(1);
  });

  it("Testing Redux State to Props", function () {
    let mockState = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      yearOfBirth: "",
      groupName: "",
      address: "",
      pincode: "",
      city: "",
      password: "",
      confirmPassword: "",
      groupNameList: null,
    };
    let result = mapStateToProps(mockState);
    expect(result).toStrictEqual(mockState);
  });
  it("Testing Redux dispatch", function () {
    let mockDispatchFun = jest.fn();
    let mockDispatch = {
      clearState: () =>
        dispatch({
          type: "CLEAR_STATE",
        }),
    };
    let result = mapDispatchToProps(mockDispatchFun);
    expect(JSON.stringify(result)).toBe(JSON.stringify(mockDispatch));
  });

  it("Testing Redux dispatch function", function () {
    let mockDispatchFun = jest.fn((x) => x.type);
    let result = mapDispatchToProps(mockDispatchFun);
    expect(result.clearState(null)).toBe("CLEAR_STATE");
  });
});

describe("Tssting Button Clicks", function () {
  it("Check next click button functionality", function () {
    wrapper.instance().validateDetails = jest.fn().mockReturnValue(true);
    wrapper.instance().validateAddress = jest.fn().mockReturnValue(true);
    wrapper.instance().validatePassword = jest.fn().mockReturnValue(false);

    wrapper.update();

    wrapper.instance().nextStep({ preventDefault: jest.fn() });
    expect(wrapper.state("step")).toBe(2);

    wrapper.instance().nextStep({ preventDefault: jest.fn() });
    expect(wrapper.state("step")).toBe(3);

    wrapper.instance().nextStep({ preventDefault: jest.fn() });
    expect(wrapper.state("step")).toBe(3);
  });
  it("Check prev step button functionality", function () {
    wrapper.instance().prevStep();
    expect(wrapper.state("step")).toBe(2);

    wrapper.instance().prevStep();
    expect(wrapper.state("step")).toBe(1);

    wrapper.instance().prevStep();
    expect(wrapper.state("step")).toBe(1);
  });

  it("Check submit button functionality", function () {
    axios.post = jest.fn().mockResolvedValue({});
    window.alert = jest.fn();
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "Password100",
      confirmPassword: "Password100",
      phone: "1234567890",
      yearOfBirth: "2000",
      address: "Sector 5",
      pincode: "123456",
      city: "Delhi",
      groupName: "",
      groupNameList: null,
      roleVisible: false,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    wrapper.instance().validatePassword = jest.fn().mockReturnValue(true);
    wrapper.setState({ step: 3 });
    wrapper.update();

    wrapper.instance().nextStep({ preventDefault: jest.fn() });

    let userData = {
      accountLocked: false,
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "Password100",
      phone: 1234567890,
      yearOfBirth: 2000,
      address: "Sector 5",
      pinCode: 123456,
      city: "Delhi",
      groupName: "customer",
    };

    expect(axios.post).toHaveBeenCalledWith(expect.anything(), userData);
  });
});

describe("Testing Validate Details", function () {
  it("Checking Validate Details (wrong firstName)", function () {
    let mockProps = {
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
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateDetails()).toBeFalsy();
  });
  it("Checking Validate Details (wrong lastName)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      yearOfBirth: "",
      address: "",
      pincode: "",
      city: "",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateDetails()).toBeFalsy();
  });
  it("Checking Validate Details (wrong email)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      yearOfBirth: "",
      address: "",
      pincode: "",
      city: "",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateDetails()).toBeFalsy();
  });
  it("Checking Validate Details (wrong phone)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "",
      confirmPassword: "",
      phone: "",
      yearOfBirth: "",
      address: "",
      pincode: "",
      city: "",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateDetails()).toBeFalsy();
  });
  it("Checking Validate Details (wrong yearOfBirth: 1)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "",
      confirmPassword: "",
      phone: "1234567890",
      yearOfBirth: "",
      address: "",
      pincode: "",
      city: "",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateDetails()).toBeFalsy();
  });
  it("Checking Validate Details (wrong yearOfBirth: 2)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "",
      confirmPassword: "",
      phone: "1234567890",
      yearOfBirth: "3000",
      address: "",
      pincode: "",
      city: "",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateDetails()).toBeFalsy();
  });
  it("Checking Validate Details (all Correct)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "",
      confirmPassword: "",
      phone: "1234567890",
      yearOfBirth: "2000",
      address: "",
      pincode: "",
      city: "",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateDetails()).toBeTruthy();
  });
  it("Checking Validate Details (role not selected)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "",
      confirmPassword: "",
      phone: "1234567890",
      yearOfBirth: "2000",
      address: "",
      pincode: "",
      city: "",
      groupName: "",
      groupNameList: ["customer", "admin"],
      roleVisible: true,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateDetails()).toBeFalsy();
  });
});

describe("Testing Validate Address", function () {
  it("Checking Validate Address (wrong address)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "",
      confirmPassword: "",
      phone: "1234567890",
      yearOfBirth: "2000",
      address: "",
      pincode: "",
      city: "",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateAddress()).toBeFalsy();
  });
  it("Checking Validate Address (wrong city)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "",
      confirmPassword: "",
      phone: "1234567890",
      yearOfBirth: "2000",
      address: "Sector 5",
      pincode: "",
      city: "",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateAddress()).toBeFalsy();
  });
  it("Checking Validate Address (wrong pincode)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "",
      confirmPassword: "",
      phone: "1234567890",
      yearOfBirth: "2000",
      address: "Sector 5",
      pincode: "12345",
      city: "Delhi",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateAddress()).toBeFalsy();
  });
  it("Checking Validate Address (all Correct)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "",
      confirmPassword: "",
      phone: "1234567890",
      yearOfBirth: "2000",
      address: "Sector 5",
      pincode: "123456",
      city: "Delhi",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validateAddress()).toBeTruthy();
  });
});

describe("Testing Validate Password", function () {
  it("Checking Validate Password (wrong password)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "Pass",
      confirmPassword: "",
      phone: "1234567890",
      yearOfBirth: "2000",
      address: "Sector 5",
      pincode: "123456",
      city: "Delhi",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validatePassword()).toBeFalsy();
  });
  it("Checking Validate Password (wrong confirm password)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "Password100",
      confirmPassword: "Password101",
      phone: "1234567890",
      yearOfBirth: "2000",
      address: "Sector 5",
      pincode: "123456",
      city: "Delhi",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validatePassword()).toBeFalsy();
  });
  it("Checking Validate Password (all Correct)", function () {
    let mockProps = {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@gmail.com",
      password: "Password100",
      confirmPassword: "Password100",
      phone: "1234567890",
      yearOfBirth: "2000",
      address: "Sector 5",
      pincode: "123456",
      city: "Delhi",
      groupName: "",
      groupNameList: null,
    };
    wrapper = shallow(<RegisterCard {...mockProps}></RegisterCard>);

    expect(wrapper.instance().validatePassword()).toBeTruthy();
  });
});
