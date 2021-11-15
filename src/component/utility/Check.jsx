/* istanbul ignore file */
import React from "react";

class Check_ extends React.Component {
    state = { 
        isChecked : false
     }

     onChange = e =>{
         if(e.target.type==="checkbox")
            this.setState({[e.target.name]:e.target.checked})
     }
    render() { 
        const {isChecked}=this.state
        return ( 
        <div>
            <h1>Is Checked : {isChecked?"Yes":"No"}</h1>
            <label class="checkbox">
            <span class="checkbox__input">
            <input type="checkbox" name="isChecked" checked={isChecked} onChange={this.onChange}/>
                <span class="checkbox__control">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    d="M1.73 12.91l6.37 6.37L22.79 4.59"
                    />
                </svg>
                </span>
            </span>
            <span class="radio__label">Checkbox</span>
            </label>
        </div> 
        );
    }
}
 
export default Check_;

