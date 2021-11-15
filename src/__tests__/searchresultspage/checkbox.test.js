import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import Checkbox from "../../component/searchresultspage/checkbox";

configure({
  adapter: new Adapter(),
});

let props = {
  label: "Checkbox",
  name: "checkbox",
  onClick: () => {
    checked = !checked;
  },
};

let checked = false;
let wrapper = null;

describe("Testing Checkbox component", function () {
  it("Testing whether the component mounts or not without any props", function () {
    shallow(<Checkbox />);
  });

  it("Testing whether the component mounts or not with props", function () {
    wrapper = shallow(<Checkbox {...props} />);
  });

  it("Testing whether label is correct", function () {
    let labelWrapper = wrapper.find("label");
    const expected = props.label;
    const received = labelWrapper.children().at(0).text();
    expect(received).toEqual(expected);
  });

  it("Testing whether toggle is working", function () {
    const expected = !checked;
    wrapper.simulate("click", {});
    const received = checked;
    expect(received).toEqual(expected);
  });
});
