import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import ChangePassword_ from "../../component/profile/ChangePasswordForm";
import axios from "axios";

import "../../setupTests";

configure({
  adapter: new Adapter(),
});

describe("Testing ChangePassword component Mounting", function () {
  it("Testing whether the ChangePassword component is mount or not", function () {
    try {
      const wrapper = shallow(<ChangePassword_></ChangePassword_>);
    } catch (error) {
      fail();
    }
  });

  it("Testing whether the ChangePassword object is created or not", function () {
    try {
      const wrapper = shallow(<ChangePassword_></ChangePassword_>);
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });

  it("Testing the initial state values of ChangePassword", function () {
    try {
      const wrapper = shallow(<ChangePassword_></ChangePassword_>);
      let obj = wrapper.instance();
      // let state_val = obj.state.isChecked;

      let currentPassword = obj.state.currentPassword;
      let newPassword = obj.state.newPassword;
      let confirmNewPassword = obj.state.confirmNewPassword;

      let user = obj.state.user;
      let isAuthenticated = obj.state.isAuthenticated;
      let isCorrect = obj.state.isCorrect;
      let passwordsMatch = obj.state.passwordsMatch;
      let currentError = obj.state.currentError;
      let newError = obj.state.newError;
      let matchError = obj.state.matchError;

      expect(currentPassword).toBe("");
      expect(newPassword).toBe("");
      expect(confirmNewPassword).toBe("");

      expect(isAuthenticated).toBe(false);
      expect(isCorrect).toBe(true);
      expect(passwordsMatch).toBe(true);
      expect(currentError).toBe("");
      expect(newError).toBe("");
      expect(matchError).toBe("");
    } catch (error) {
      //      console.error();
      fail();
    }
  });
});

describe("Testing Change Password Component", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ChangePassword_ />);
  });

  it("should have a h2 tag with text Password Reset", () => {
    expect(wrapper.find("div").at(2).text()).toBe("Password Reset");
  });

  it("should have a form component ", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });

  it("should have input for current password, new password and confirm new password", () => {
    expect(wrapper.find("input#currentPassword")).toHaveLength(1);
    expect(wrapper.find("input#newPassword")).toHaveLength(1);
    expect(wrapper.find("input#confirmNewPassword")).toHaveLength(1);
  });

  it("should have initially an empty email and password state var", () => {
    let actualuserstate = wrapper.state("user");
    let expecteduserstate = {
      currentPassword: "",
      newPassword: "",
    };
    expect(actualuserstate).toEqual(expecteduserstate);
  });

  it("should have proper placeholder", () => {
    let actualPlaceholderForCurrentPasswordinput = wrapper
      .find("input")
      .at(0)
      .getElement().props.placeholder;
    let expectedPlaceholderForCurrentPasswordinput = "Enter current password";
    let actualPlaceholderForNewPasswordInput = wrapper
      .find("input")
      .at(1)
      .getElement().props.placeholder;
    let expectedPlaceholderForNewPasswordInput = "Enter New Password";
    let actualPlaceholderForConfirmNewPasswordInput = wrapper
      .find("input")
      .at(2)
      .getElement().props.placeholder;
    let expectedPlaceholderForConfirmNewPasswordInput = "Confirm New Password";
    expect(actualPlaceholderForCurrentPasswordinput).toBe(
      expectedPlaceholderForCurrentPasswordinput
    );
    expect(actualPlaceholderForNewPasswordInput).toBe(
      expectedPlaceholderForNewPasswordInput
    );
    expect(actualPlaceholderForConfirmNewPasswordInput).toBe(
      expectedPlaceholderForConfirmNewPasswordInput
    );
  });

  it("current password check", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    let actualuserstate = wrapper.state("user");
    let expecteduserstate = {
      currentPassword: "psiasdebatch6",
      newPassword: "",
    };
    expect(actualuserstate).toEqual(expecteduserstate);
  });

  it("new password check", () => {
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "psiasdebatch7" },
    });
    let actualuserstate = wrapper.state("user");
    let expecteduserstate = {
      currentPassword: "",
      newPassword: "psiasdebatch7",
    };
    expect(actualuserstate).toEqual(expecteduserstate);
  });

  it("confirm new password check", () => {
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "psiasdebatch7" },
    });
    let actualuserstate = wrapper.state("confirmNewPassword");
    let expecteduserstate = "psiasdebatch7";
    expect(actualuserstate).toEqual(expecteduserstate);
  });

  it("should have proper type for input ", () => {
    let actualtypeForcurrentPasswordinput = wrapper
      .find("input")
      .at(0)
      .getElement().props.type;
    let expectedtyperForcurrentPasswordinput = "password";
    let actualtypeForNewPasswordInput = wrapper.find("input").at(1).getElement()
      .props.type;
    let expectedtypeForNewPasswordinput = "password";
    let actualtypeForConfirmNewPasswordInput = wrapper
      .find("input")
      .at(2)
      .getElement().props.type;
    let expectedtypeForConfirmNewPasswordInput = "password";
    expect(actualtypeForcurrentPasswordinput).toBe(
      expectedtyperForcurrentPasswordinput
    );
    expect(actualtypeForNewPasswordInput).toBe(expectedtypeForNewPasswordinput);
    expect(actualtypeForConfirmNewPasswordInput).toBe(
      expectedtypeForConfirmNewPasswordInput
    );
  });

  it("should have proper name for input ", () => {
    let actualNameForcurrentPasswordinput = wrapper
      .find("input")
      .at(0)
      .getElement().props.name;
    let expectedNamerForcurrentPasswordinput = "currentPassword";
    let actualNameForNewPasswordInput = wrapper.find("input").at(1).getElement()
      .props.name;
    let expectedNameForNewPasswordinput = "newPassword";
    let actualNameForConfirmNewPasswordInput = wrapper
      .find("input")
      .at(2)
      .getElement().props.name;
    let expectedNameForConfirmNewPasswordInput = "confirmNewPassword";
    expect(actualNameForcurrentPasswordinput).toBe(
      expectedNamerForcurrentPasswordinput
    );
    expect(actualNameForNewPasswordInput).toBe(expectedNameForNewPasswordinput);
    expect(actualNameForConfirmNewPasswordInput).toBe(
      expectedNameForConfirmNewPasswordInput
    );
  });

  it("all inputs simultaneous check", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "psiasdebatch7" },
    });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "psiasdebatch7" },
    });

    let actualuserstate = wrapper.state("user");
    let expecteduserstate = {
      currentPassword: "psiasdebatch6",
      newPassword: "psiasdebatch7",
      confirmNewPassword: "psiasdebatch7",
    };
    let actualconfirmPassword = wrapper.state("confirmNewPassword");
    let expectedconfirmPassword = "psiasdebatch7";
    expect(actualconfirmPassword).toEqual(expectedconfirmPassword);
    // console.log(actualuserstate)
    expect(actualuserstate).toEqual(expecteduserstate);
    // expect(actualconfirmNewPassword).toEqual(expectedconfirmNewPassword);
  });

  it("should have a button component", () => {
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
  });

  // it('should have a p tag with warning texts ',()=>{

  //     wrapper.instance().setState({isCorrect:false})
  //     expect(wrapper.find('p').at(0).text()).toBe('Invalid email or password');
  // });

  it("user enters wrong current password assuming new password  has passed validation", async () => {
    axios.put = jest.fn();
    await axios.put.mockImplementationOnce(() => Promise.reject());
    let obj = wrapper.instance();
    await obj.handleSubmit({ preventDefault: () => {} });
    expect(obj.state.isCorrect).toBe(false);
  });

  it("user enters correct current password assuming new password  has passed validation", async () => {
    axios.put = jest.fn();
    axios.put.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality
    obj = await wrapper.instance();
    expect(obj.state.isAuthenticated).toBe(true);
  });

  // it('login check with right data but Otp generation failed ', async () => {
  //         axios.post = jest.fn()
  //          axios.post
  //          .mockResolvedValueOnce({})
  //          .mockRejectedValueOnce({})
  //         let obj = wrapper.instance();
  //         obj.handleSubmit({preventDefault : () => {}});
  //         // await is called two times as nested axios call required updates in state
  //         // or we can say asynchronous functionality
  //         obj = await wrapper.instance();
  //         expect(obj.state.isAuthenticated).toBe(true);
  //         obj = await wrapper.instance();
  //         expect(obj.state.isOtpGenerated ).toBe(false);
  // })

  // it('check working of window location property ',() => {
  //     const { location } = window;
  //     delete window.location;
  //     window.location = { href: jest.fn() };
  //     expect(jest.isMockFunction(window.location.href)).toBe(true);
  //     window.location.href();
  //     expect(window.location.href).toHaveBeenCalled();
  //     window.location = location;
  // })
});

describe("Validations on Change Password", function () {
  let wrapper;
  let expectedMatchError;
  let expectedCurrentError;
  let expectedNewErrorBig;
  let expectedNewError;

  beforeEach(() => {
    wrapper = shallow(<ChangePassword_ />);
    expectedMatchError = "Passwords do not match";
    expectedCurrentError = "current password is incorrect";
    expectedNewErrorBig =
      "Passwords should not start with special char, should be between 8 and 20 chars, should contain atleast 1 alphabet, 1 digit, and 1 special character";
  });

  it("length of new password is less than 8", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper
      .find("input#newPassword")
      .simulate("change", { target: { name: "newPassword", value: "123" } });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "123" },
    });

    axios.put = jest.fn();
    axios.put.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality

    let actualnewError = wrapper.state("newError");
    expectedNewError = "Passwords length should not be less than 8 characters";
    expect(actualnewError).toEqual(expectedNewError);
  });

  it("length of new password is greater than 20", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "123456789009876543211" },
    });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "123456789009876543211" },
    });

    axios.put = jest.fn();
    axios.put.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality

    let actualnewError = wrapper.state("newError");
    expectedNewError =
      "Passwords length should not be greater than 20 characters";
    expect(actualnewError).toEqual(expectedNewError);
  });

  it("new password consists of only digits", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "12345678900987654321" },
    });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "12345678900987654321" },
    });

    axios.put = jest.fn();
    axios.put.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality

    let actualnewError = wrapper.state("newError");

    expect(actualnewError).toEqual(expectedNewErrorBig);
  });

  it("new password consists of only alphabets", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "abcdefghij" },
    });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "abcdefghi" },
    });

    axios.put = jest.fn();
    axios.put.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality

    let actualnewError = wrapper.state("newError");

    expect(actualnewError).toEqual(expectedNewErrorBig);
  });

  it("new password consists of only special characters", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "@@@@@@@@@" },
    });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "@@@@@@@@@" },
    });

    axios.put = jest.fn();
    axios.put.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality

    let actualnewError = wrapper.state("newError");

    expect(actualnewError).toEqual(expectedNewErrorBig);
  });

  it("new password consists of only digits and special characters", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "@@@@@12345" },
    });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "@@@@@12345" },
    });

    axios.put = jest.fn();
    axios.put.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality

    let actualnewError = wrapper.state("newError");

    expect(actualnewError).toEqual(expectedNewErrorBig);
  });

  it("new password consists of only digits and alphabets", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "abcd12345" },
    });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "abcd12345" },
    });

    axios.put = jest.fn();
    axios.put.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality

    let actualnewError = wrapper.state("newError");

    expect(actualnewError).toEqual(expectedNewErrorBig);
  });

  it("new password consists of only alphabets and special characters", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "abcd@@@@@" },
    });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "abcd@@@@@" },
    });

    axios.put = jest.fn();
    axios.put.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality

    let actualnewError = wrapper.state("newError");

    expect(actualnewError).toEqual(expectedNewErrorBig);
  });

  it("new password passes all validations but does not match with confirm password", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "abcd@@@123" },
    });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "abcd@@@321" },
    });

    axios.put = jest.fn();
    axios.put.mockImplementationOnce(() => Promise.reject());
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality
    // obj = await wrapper.instance();
    let actualnewError = wrapper.state("matchError");
    let passwordsMatch = wrapper.state("passwordsMatch");
    // expect(actualnewError).toEqual(expectedMatchError);
    expect(passwordsMatch).toBe(false);
  });

  it("new password is fine and old password is also fine", () => {
    wrapper.find("input#currentPassword").simulate("change", {
      target: { name: "currentPassword", value: "psiasdebatch6" },
    });
    wrapper.find("input#newPassword").simulate("change", {
      target: { name: "newPassword", value: "abcd@@123" },
    });
    wrapper.find("input#confirmNewPassword").simulate("change", {
      target: { name: "confirmNewPassword", value: "abcd@@123" },
    });

    axios.put = jest.fn();
    axios.put.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({ preventDefault: () => {} });
    // await is called two times as nested axios call required updates in state
    // or we can say asynchronous functionality

    let actualnewError = wrapper.state("newError");
    let actualmatchError = wrapper.state("matchError");
    let actualcurrentError = wrapper.state("currentError");
    expect(actualnewError).toEqual("");
    expect(actualmatchError).toEqual("");
    expect(actualcurrentError).toEqual("");
  });
});
