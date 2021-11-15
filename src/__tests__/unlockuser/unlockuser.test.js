import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import axios from "axios";
import UnlockUser from "../../component/unlockuser/unlockuser";

configure({
  adapter: new Adapter(),
});

let userResults = [
  {
    userId: 101,
    firstName: "F1",
    lastName: "L1",
    email: "f1@email.com",
    groupName: "user",
    accountLocked: true,
  },
  {
    userId: 102,
    firstName: "F2",
    lastName: "L2",
    email: "f2@email.com",
    groupName: "user",
    accountLocked: true,
  },
  {
    userId: 103,
    firstName: "F3",
    lastName: "L3",
    email: "f3@email.com",
    groupName: "user",
    accountLocked: true,
  },
  {
    userId: 104,
    firstName: "F4",
    lastName: "L4",
    email: "f4@email.com",
    groupName: "user",
    accountLocked: true,
  },
  {
    userId: 105,
    firstName: "F5",
    lastName: "L5",
    email: "f5@email.com",
    groupName: "user",
    accountLocked: true,
  },
  {
    userId: 106,
    firstName: "F6",
    lastName: "L6",
    email: "f6@email.com",
    groupName: "user",
    accountLocked: true,
  },
];

let wrapper = null;

describe("Testing UnlockUser component", function () {
  beforeEach(() => {
    axios.get = jest.fn().mockResolvedValue({ data: userResults });
    wrapper = shallow(<UnlockUser />);
  });

  it("Testing whether component mounts", function () {
    axios.get = jest.fn().mockResolvedValue({ data: userResults });
    wrapper = shallow(<UnlockUser />);
  });

  it("Testing state after mounting", function () {
    let obj = wrapper.instance();
    jest.spyOn(obj, "getUsers");
    expect(obj.state.userResults).toEqual(userResults);
    expect(obj.state.filteredResults).toEqual(userResults);
  });

  it("Testing getUsers function without errors", function () {
    let obj = wrapper.instance();
    jest.spyOn(obj, "getUsers");
    obj.componentDidMount();
    expect(obj.getUsers).toHaveBeenCalledTimes(1);
  });

  it("Testing getUsers function with errors", function () {
    const networkError = new Error("Network error");
    axios.get = jest.fn().mockRejectedValueOnce(networkError);
    let obj = wrapper.instance();
    jest.spyOn(obj, "getUsers");
    obj.componentDidMount();
    expect(obj.getUsers).toHaveBeenCalledTimes(1);
  });

  it("Testing email change handler", function () {
    let emailInputWrapper = wrapper.find("input").at(0);
    emailInputWrapper.simulate("change", {
      preventDefault: () => {},
      target: { name: "email", value: "f1@email.com" },
    });
    let obj = wrapper.instance();
    const expected = "f1@email.com";
    const received = obj.state.email;
    expect(received).toEqual(expected);
  });

  it("Testing filter users function", function () {
    let filterUsersButtonWrapper = wrapper.find('Button[label="Filter"]');
    let filterEmail = "f1@email.com";
    wrapper.setState({ email: filterEmail });
    filterUsersButtonWrapper.props().handleClick({ preventDefault: () => {} });
    let obj = wrapper.instance();
    const expected = userResults.filter((user) => user.email === filterEmail);
    const received = obj.state.filteredResults;
    expect(received).toEqual(expected);
  });

  it("Testing lock status toggle switch", function () {
    let toggleLockStatusWrapper = wrapper.find("ToggleSwitch");
    toggleLockStatusWrapper.at(0).simulate("change", {
      preventDefault: () => {},
      target: {
        parentElement: {
          attributes: { userId: { value: userResults[0].userId } },
        },
      },
    });
    let obj = wrapper.instance();
    expect(axios.get).toHaveBeenCalled();
  });

  // it("Testing lock status toggle switch with errors", function () {
  //   const networkError = new Error("Network error");
  //   axios.get = jest.fn().mockRejectedValueOnce(networkError);
  //   let toggleLockStatusWrapper = wrapper.find("ToggleSwitch");
  //   toggleLockStatusWrapper.at(0).simulate("change", {
  //     preventDefault: () => {},
  //     target: {
  //       parentElement: {
  //         attributes: { userId: { value: userResults[0].userId } },
  //       },
  //     },
  //   });
  //   expect(axios.get).toHaveBeenCalled();
  // });

  it("Testing reset filter button", function () {
    let resetFilterButtonWrapper = wrapper.find('Button[label="Reset"]');
    wrapper.setState({ email: "f1@email.com" });
    resetFilterButtonWrapper.props().handleClick({ preventDefault: () => {} });
    let obj = wrapper.instance();
    const expected = "";
    const received = obj.state.email;
    expect(received).toEqual(expected);
  });
});
