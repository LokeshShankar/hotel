import { Component } from "react";
import '../../css/viewhotelsadmin/toggleswitchadmin.css'

class ToggleSwitchAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <label labelid ={this.props.hotelid} className="switchAdmin" >
                <input type="checkbox" inputkey={this.props.hotelid} checked={this.props.checked} onChange={() => this.props.toggleVisibility(this.props.hotelid)}/>
                <span className="sliderAdmin" spankey={this.props.hotelid}></span>
            </label>

         );
    }
}
 
export default ToggleSwitchAdmin;