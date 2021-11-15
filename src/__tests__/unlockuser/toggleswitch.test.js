import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import ToggleSwitch from '../../component/unlockuser/toggleswitch';

configure({
  adapter: new Adapter()
});

let props = {
    userId: 100,
    accountLocked: false,
}

let wrapper = null;

describe('Testing ToggleSwitch component', function () {

    it('Testing whether the component mounts or not without any props', function () {
      shallow(<ToggleSwitch />);
    });
  
    it('Testing whether the component mounts or not with props', function () {
      wrapper = shallow(<ToggleSwitch {...props} />);
    });
  
  });