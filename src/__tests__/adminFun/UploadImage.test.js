import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import UploadImage from "../../component/addhotel/UploadImage";

configure({
  adapter: new Adapter(),
});

let wrapper;

const mockhotelImagesCallback = jest.fn();

const prop = {
  hotelImagesCallback: mockhotelImagesCallback,
  hotelImages: []
};

beforeEach(() => {
  wrapper = shallow(<UploadImage {...prop} />);
});

describe("Testing Upload Image Component", function () {
  it("Testing whether the object is created or not", function () {
    let obj = wrapper.instance();
  });

  it("Testing the upload function", function () {
    let button = wrapper.find("Button").at(0);
    wrapper.setState({
      images: ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"],
    });
    button.props().handleClick({ preventDefault: () => {} });
  });

  it("Testing the setImages", function () {
    let obj = wrapper.instance();
    obj.setImages("image");
    expect(obj.state.images).toBe("image");
  });

  it("Test generateRandomString ", function () {
    let obj = wrapper.instance();
    obj.generateRandomString();
    expect(obj.state.images).toStrictEqual([]);
  });

  it("Test dataURLtoFile ", function () {
    let obj = wrapper.instance();
    obj.dataURLtoFile(
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/",
      "6n9ijlg4yn.jpg"
    );
    expect(obj.state.images).toStrictEqual([]);
  });
});
