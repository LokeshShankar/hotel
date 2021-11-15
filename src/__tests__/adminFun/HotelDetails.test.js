import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import HotelDetails from "../../component/addhotel/HotelDetails";
configure({
  adapter: new Adapter(),
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<HotelDetails {...prop} />);
});

describe("Testing Hotel Details Component", function () {
  it("Testing whether the object is created or not", function () {
    let obj = wrapper.instance();
  });

  it("To count numbers of Input tags on Hotel Details ", function () {
    let count = wrapper.find("Input").length;
    expect(count).toBe(6);
  });

  it("To count numbers of Button tags on Hotel Details  ", function () {
    let count = wrapper.find("Button").length;
    expect(count).toBe(1);
  });

  it("To check the value of hname in state while entering value in Hotel Name ", function () {
    let object = wrapper.find("Input").at(0);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "hname", value: "Grand Venizia" },
    });
    let obj = wrapper.instance();
    expect(obj.state.hname).toBe("Grand Venizia");
  });

  it("To check the value of hphone in state while entering value in Phone ", function () {
    let object = wrapper.find("Input").at(1);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "hphone", value: "9871310263" },
    });
    let obj = wrapper.instance();
    expect(obj.state.hphone).toBe("9871310263");
  });

  it("To check hotelImagesCallback  ", function () {
    let object = wrapper.instance();
    object.hotelImagesCallback(["image"]);
    expect(object.state.hotelImages).toStrictEqual(["image"]);
  });

  it("To check the value of hemail in state while entering value in Email ", function () {
    let object = wrapper.find("Input").at(2);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "hemail", value: "hotel@gmail.com" },
    });
    let obj = wrapper.instance();
    expect(obj.state.hemail).toBe("hotel@gmail.com");
  });

  it("To check the value of htax in state while entering value in Tax ", function () {
    let object = wrapper.find("Input").at(3);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "htax", value: "10.53" },
    });
    let obj = wrapper.instance();
    expect(obj.state.htax).toBe("10.53");
  });

  it("To check the value of CheckinDate ", function () {
    let object = wrapper.find("Input").at(4);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "checkInTime", value: "2020-11-12" },
    });
    let obj = wrapper.instance();
    expect(obj.state.checkInTime).toBe("2020-11-12");
  });

  it("To check the value of CheckoutDate ", function () {
    let object = wrapper.find("Input").at(4);
    object.simulate("change", {
      preventDefault: () => {},
      target: { name: "checkOutTime", value: "2020-11-12" },
    });
    let obj = wrapper.instance();
    expect(obj.state.checkOutTime).toBe("2020-11-12");
  });

  it("To check for invalid input feilds", function () {
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    mockInfoToAddHotel(inputTags);
    fillDataInAddHotel(inputTags.at(0), "hname", "Grand Vistara");
    fillDataInAddHotel(inputTags.at(1), "hphone", "987130562");
    fillDataInAddHotel(inputTags.at(2), "hemail", "grand");
    fillDataInAddHotel(inputTags.at(3), "htax", "40");
    object.props().handleClick({ preventDefault: () => {} });

    let obj = wrapper.instance();
    expect(obj.state.errors).toStrictEqual({
      hemail: "Invalid email id",
      hphone: "Invalid phone no",
      htax: "Invalid tax",
    });
  });

  it("To check all input feilds are valid", function () {
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    mockInfoToAddHotel(inputTags);
    fillDataInAddHotel(inputTags.at(3), "htax", "5.12");
    object.props().handleClick({ preventDefault: () => {} });

    let obj = wrapper.instance();
    expect(obj.state.errors).toStrictEqual({});
  });

  it("To check tax input feilds are invalid", function () {
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    mockInfoToAddHotel(inputTags);
    fillDataInAddHotel(inputTags.at(3), "htax", "sa");
    object.props().handleClick({ preventDefault: () => {} });

    let obj = wrapper.instance();
    expect(obj.state.errors).toStrictEqual({ htax: "Invalid tax" });
  });

  it("To check all input feilds are empty", function () {
    let object = wrapper.find("Button").at(0);
    let inputTags = wrapper.find("Input");
    mockEmptyValues(inputTags);
    object.props().handleClick({ preventDefault: () => {} });

    let obj = wrapper.instance();
    expect(obj.state.errors).toStrictEqual({
      hname: "Hotel name can't be empty",
      hphone: "Phone no can't be empty",
      hemail: "Email Id can't be empty",
      checkInTime: "Checkin time can't be empty",
      checkOutTime: "checkout time time can't be empty",
    });
  });
});

const mockhotelDetailsCallback = jest.fn();

const prop = {
  hotelDetailsCallback: mockhotelDetailsCallback,
};

const fillDataInAddHotel = (object, tagName, tagValue) => {
  object.simulate("change", {
    preventDefault: () => {},
    target: { name: tagName, value: tagValue },
  });
};

function mockInfoToAddHotel(inputTags) {
  fillDataInAddHotel(inputTags.at(0), "hname", "Grand Vistara");
  fillDataInAddHotel(inputTags.at(1), "hphone", "9871310562");
  fillDataInAddHotel(inputTags.at(2), "hemail", "grand@gmail.com");
  fillDataInAddHotel(inputTags.at(3), "htax", "5.12");
}

function mockEmptyValues(inputTags) {
  fillDataInAddHotel(inputTags.at(0), "hname", "");
  fillDataInAddHotel(inputTags.at(1), "hphone", "");
  fillDataInAddHotel(inputTags.at(2), "hemail", "");
  fillDataInAddHotel(inputTags.at(3), "htax", 0);
  fillDataInAddHotel(inputTags.at(3), "checkInTime", "");
  fillDataInAddHotel(inputTags.at(3), "checkOutTime", "");
}
