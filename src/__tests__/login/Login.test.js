import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";
import Login from "../../component/login/Login";
import {
  LOGIN_SERVICE_BASE_URL,
  NOTIFICATION_SERVICE_BASE_URL,
  USER_SERVICE_BASE_URL,
} from "../../component/utility/Constant";

configure({
  adapter: new Adapter(),
});

describe("Testing Login Component", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login history={{ push: () => {} }} />);
  });

  it("should have a h2 tag with text LOG IN", () => {
    expect(wrapper.find("h2").at(0).text()).toBe("Log in");
  });

  it("should have a form component ", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });

  it("should have input for email and password", () => {
    expect(wrapper.find("input#email")).toHaveLength(1);
    expect(wrapper.find("input#password")).toHaveLength(1);
  });

  it("should have initially an empty email and password state var", () => {
    let actualuserstate = wrapper.state("user");
    let expecteduserstate = {
      email: "",
      password: "",
    };
    expect(actualuserstate).toEqual(expecteduserstate);
  });

  it("should have proper plcaeholder", () => {
    let actualPlaceholderForEmailinput = wrapper
      .find("input")
      .at(0)
      .getElement().props.placeholder;
    let expectedPlaceholderForEmailinput = "Email";
    let actualPlaceholderForPasswordInput = wrapper
      .find("input")
      .at(1)
      .getElement().props.placeholder;
    let expectedPlaceholderForPasswordinput = "Password";
    expect(actualPlaceholderForEmailinput).toBe(
      expectedPlaceholderForEmailinput
    );
    expect(actualPlaceholderForPasswordInput).toBe(
      expectedPlaceholderForPasswordinput
    );
  });

  it("email check", () => {
    wrapper
      .find('input[type="email"]')
      .simulate("change", {
        target: { name: "email", value: "psiasdebatch6@gmail.com" },
      });
    let actualuserstate = wrapper.state("user");
    let expecteduserstate = {
      email: "psiasdebatch6@gmail.com",
      password: "",
    };
    expect(actualuserstate).toEqual(expecteduserstate);
  });

  it("password check", () => {
    wrapper
      .find('input[type="password"]')
      .simulate("change", {
        target: { name: "password", value: "psiasdebatch6" },
      });
    let actualuserstate = wrapper.state("user");
    let expecteduserstate = {
      email: "",
      password: "psiasdebatch6",
    };
    expect(actualuserstate).toEqual(expecteduserstate);
  });

  it("should have proper type for input ", () => {
    let actualtypeForEmailinput = wrapper.find("input").at(0).getElement()
      .props.type;
    let expectedtyperForEmailinput = "email";
    let actualtypeForPasswordInput = wrapper.find("input").at(1).getElement()
      .props.type;
    let expectedtypeForPasswordinput = "password";
    expect(actualtypeForEmailinput).toBe(expectedtyperForEmailinput);
    expect(actualtypeForPasswordInput).toBe(expectedtypeForPasswordinput);
  });

  it("should have proper name for input ", () => {
    let actualnameForEmailinput = wrapper.find("input").at(0).getElement()
      .props.name;
    let expectednameForEmailinput = "email";
    let actualnameForPasswordInput = wrapper.find("input").at(1).getElement()
      .props.name;
    let expectednameForPasswordinput = "password";
    expect(actualnameForEmailinput).toBe(expectednameForEmailinput);
    expect(actualnameForPasswordInput).toBe(expectednameForPasswordinput);
  });

  it("both email and password check", () => {
    wrapper
      .find('input[type="email"]')
      .simulate("change", {
        target: { name: "email", value: "psiasdebatch6@gmail.com" },
      });
    wrapper
      .find('input[type="password"]')
      .simulate("change", {
        target: { name: "password", value: "psiasdebatch6" },
      });
    let actualuserstate = wrapper.state("user");
    let expecteduserstate = {
      email: "psiasdebatch6@gmail.com",
      password: "psiasdebatch6",
    };
    expect(actualuserstate).toEqual(expecteduserstate);
  });

  it("should have a button component", () => {
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
  });

  it("login check with wrong data", async () => {
    axios.post = jest.fn();
    await axios.post.mockImplementationOnce(() => Promise.reject());
    let obj = wrapper.instance();
    await obj.handleSubmit({ preventDefault: () => {} });
    expect(obj.state.errorMessage).toBe("Enter a valid Email Id");
  });

  it("login check with right  data", async () => {
    axios.post = jest.fn();
    axios.post.mockResolvedValueOnce({});
    let obj = wrapper.instance();
    obj.handleSubmit({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
    expect(obj.state.isAuthenticated).toBe(false);
  });

  it("login check with right  data", async () => {
    axios.get = jest.fn();
    axios.get.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
    let obj = wrapper.instance();
    obj.handleSubmit({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
    expect(obj.state.isAuthenticated).toBe(false);
  });

  it("login check with wrong data", async () => {
    axios.get = jest.fn();
    await axios.get.mockImplementationOnce(() => Promise.reject());
    let obj = wrapper.instance();
    await obj.handleSubmit({ preventDefault: () => {} });
    expect(obj.state.errorMessage).toBe("Enter a valid Email Id");
  });

  it("login check with right  data", async () => {
    jest.mock("axios");
    axios.get.mockImplementation((url) => {
      if (
        url ===
        USER_SERVICE_BASE_URL + "/user/checkuser/a@gmail.com"
      ) {
        return Promise.resolve({ data: true });
      } else if (
        url ===
        USER_SERVICE_BASE_URL + "/user/lockedstatus/a@gmail.com"
      ) {
        return Promise.resolve({ data: true });
      } else {
      }
    });
    let obj = wrapper.instance();
    obj.setState({
      user: {
        email: "a@gmail.com",
        password: "asd",
      },
    });
    obj.handleSubmit({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
  });
  it("credential testing", async () => {
    axios.get = jest.fn();
    axios.get
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);

    let obj = wrapper.instance();
    obj.setState({
      user: {
        email: "a@gmail.com",
        password: "asd",
      },
    });
    obj.handleSubmit({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
  });
  it("credential testing", async () => {
    axios.get = jest.fn().mockResolvedValue({});
    axios.get.mockResolvedValue({ data: true });

    let obj = wrapper.instance();
    obj.setState({
      user: {
        email: "a@gmail.com",
        password: "asd",
      },
    });
    obj.handleSubmit({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
  });
  it("credential testing", async () => {
    axios.get = jest.fn().mockResolvedValue({});
    axios.get.mockResolvedValue({ data: false });

    let obj = wrapper.instance();
    obj.setState({
      user: {
        email: "a@gmail.com",
        password: "asd",
      },
    });
    obj.handleSubmit({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
  });
  it("login check with right  data", async () => {
    jest.mock("axios");
    axios.get.mockImplementation((url) => {
      if (
        url ===
        USER_SERVICE_BASE_URL + "/user/checkuser/a@gmail.com"
      ) {
        return Promise.resolve({ data: true });
      } else if (
        url ===
        USER_SERVICE_BASE_URL + "/user/lockedstatus/a@gmail.com"
      ) {
        return Promise.resolve({ data: false });
      } else {
      }
    });
    let obj = wrapper.instance();
    obj.setState({
      user: {
        email: "a@gmail.com",
        password: "asd",
      },
    });
    obj.handleSubmit({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
  });

  it("login check with right  data", async () => {
    jest.mock("axios");
    axios.get.mockImplementation((url) => {
      if (
        url ===
        USER_SERVICE_BASE_URL + "/user/checkuser/a@gmail.com"
      ) {
        return Promise.resolve({ data: true });
      } else if (
        url ===
        USER_SERVICE_BASE_URL + "/user/lockedstatus/a@gmail.com"
      ) {
        return Promise.resolve({ data: false });
      } else {
      }
    });
    axios.post.mockImplementation((url) => {
      if (url === LOGIN_SERVICE_BASE_URL + "/login") {
        return Promise.resolve({ data: true });
      } else {
      }
    });
    let obj = wrapper.instance();
    obj.setState({
      user: {
        email: "a@gmail.com",
        password: "asd",
      },
    });
    obj.handleSubmit({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
  });

  it("login check with right  data", async () => {
    jest.mock("axios");
    axios.get.mockImplementation((url) => {
      if (
        url ===
        USER_SERVICE_BASE_URL + "/user/checkuser/a@gmail.com"
      ) {
        return Promise.resolve({ data: true });
      } else if (
        url ===
        USER_SERVICE_BASE_URL + "/user/lockedstatus/a@gmail.com"
      ) {
        return Promise.resolve({ data: false });
      } else {
      }
    });
    axios.post.mockImplementation((url) => {
      if (url === LOGIN_SERVICE_BASE_URL + "/login") {
        return Promise.reject();
      } else {
      }
    });
    let obj = wrapper.instance();
    obj.setState({
      user: {
        email: "a@gmail.com",
        password: "asd",
      },
    });
    obj.handleSubmit({
      preventDefault: () => {},
    });
    obj = await wrapper.instance();
  });
});
