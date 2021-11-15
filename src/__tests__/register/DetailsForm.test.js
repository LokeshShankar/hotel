import axios from "axios";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  DetailsForm,
  mapStateToProps,
  mapDispatchToProps,
} from "../../component/register/DetailsForm";
import { Input } from "../../component/utility/Input";

configure({
  adapter: new Adapter(),
});

jest.mock("axios");

let wrapper;

describe("Testing DetailsForm Component", function () {
  it("Testing whether the object is created or not", function () {
    wrapper = shallow(
      <DetailsForm groupNameList={["customer"]} errorMsg=""></DetailsForm>
    );
    try {
      let obj = wrapper.instance();
    } catch (error) {
      fail();
    }
  });
  it("Testing Role Dropdown", function () {
    try {
      wrapper = shallow(
        <DetailsForm
          roleVisible={true}
          groupNameList={["customer"]}
          errorMsg=""
        ></DetailsForm>
      );
      let obj = wrapper.find("select").length;
      expect(obj).toBe(1);
    } catch (error) {
      fail();
    }
  });
  it("Testing number of Input Feilds", function () {
    try {
      let obj = wrapper.find(Input).length;
      expect(obj).toBe(5);
    } catch (error) {
      fail();
    }
  });
  it("Testing Input Feilds", function () {
    try {
      let obj = wrapper.find(Input);
      expect(obj.at(0).props().label).toBe("First Name *");
      expect(obj.at(1).props().label).toBe("Last Name *");
      expect(obj.at(2).props().label).toBe("Email *");
      expect(obj.at(3).props().label).toBe("Phone *");
      expect(obj.at(4).props().label).toBe("Birth Year *");
    } catch (error) {
      fail();
    }
  });

  it("Testing Redux State to Props", function () {
    let mockState = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      yearOfBirth: "",
      groupName: "",
      groupNameList: "",
    };
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
      fillUserGroups: (userGroups) =>
        mockDispatchFun({
          type: "FILL_USER_GROUPS",
          payload: userGroups,
        }),
    };
    let result = mapDispatchToProps(mockDispatchFun);
    expect(JSON.stringify(result)).toBe(JSON.stringify(mockDispatch));
  });
  it("Testing Redux dispatch fillStateData function", function () {
    let mockDispatchFun = jest.fn((x) => x.type);
    let result = mapDispatchToProps(mockDispatchFun);
    expect(result.fillStateData(null)).toBe("FILL_DATA");
    expect(result.fillUserGroups(null)).toBe("FILL_USER_GROUPS");
  });

  it("Testing Input Change", function () {
    let mockState = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      yearOfBirth: "",
      groupName: "",
      groupNameList: "",
    };
    let fillStateData = jest.fn();
    let fillUserGroups = jest.fn();
    wrapper = shallow(
      <DetailsForm
        errorMsg=""
        fillStateData={fillStateData}
        fillUserGroups={fillUserGroups}
        {...mockState}
      ></DetailsForm>
    );

    wrapper
      .instance()
      .onInputChange({ target: { name: "firstName", value: "AAA" } });

    expect(wrapper.state("firstName")).toBe("AAA");
  });

  it("Testing User Groups Axios call in Constructor", function () {
    try {
      axios.get = jest.fn().mockResolvedValue({ data: ["customer", "admin"] });
      let mockProps = {
        groupNameList: null,
        roleVisible: true,
        fillUserGroups: jest.fn(),
      };
      const obj = new DetailsForm({ ...mockProps });

      expect(obj.state.groupNameList).toStrictEqual(["customer", "admin"]);
    } catch (error) {
      //      console.log(error);
      fail();
    }
  });
});
