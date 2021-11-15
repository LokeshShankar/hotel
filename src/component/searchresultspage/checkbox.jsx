import React from 'react';
import '../../css/searchresultspage/checkbox.css';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <label className='checkbox' filteritemid={this.props.filterItemId} onClick={this.props.onClick}>{this.props.label}
                <input type="checkbox" name={this.props.name}/>
                <span className="checkmark"></span>
            </label>
         );
    }
}
 
export default Checkbox;