import { Component } from "react";
import '../../css/unlockuser/toggleswitch.css'

class ToggleSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <label className="switch" userid={this.props.userId}>
                <input type="checkbox" checked={this.props.accountLocked} onChange={this.props.onChange}/>
                <span className="slider"></span>
            </label>
         );
    }
}
 
export default ToggleSwitch;