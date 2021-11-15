import React from "react";
// import '../css/Radio'

class Radio_ extends React.Component {
    state = { 
        radio_value:""
     };


     constructor(props){
         super(props);
     }

     onChange = e =>{
         this.setState({[e.target.name]:e.target.value})
     }
    render() { 
        const {radio_value} = this.state;
        
        return ( <div>
                {/* ==> uncomment the below line to see state change of component on Selection */}
                <h1>{radio_value}</h1>  
                

                {/* //Radio Button 1 */}
                <label class="radio">
                
                    <span class="radio__input">
                        <input 
                            type="radio" 
                            checked={radio_value==="Option 1"} 
                            name="radio_value" 
                            value="Option 1" 
                            onChange={this.onChange}
                        />
                        <span class="radio__control"></span>
                    </span>

                    <span class="radio__label">Option 1</span>
                    
                </label>

                {/* Radio Button 2 */}
                <label class="radio">
                    
                    <span class="radio__input">
                            <input 
                            type="radio" 
                            checked={radio_value==="Option 2"} 
                            name="radio_value" 
                            value="Option 2" 
                            onChange={this.onChange}
                            />
                            <span class="radio__control"></span>
                    </span>

                    <span class="radio__label">Option 2</span>
                </label>

                 {/* Radio Button 3 */}
                 {/* **********Stateless Radio Button******** */}
                 <label class="radio">

                    <span class="radio__input">
                        <input 
                            type="radio" 
                            // checked={radio_value==="Option 2"} 
                            name="radio_value" 
                            // value="Option 2" 
                            onChange={this.onChange}
                        />
                        <span class="radio__control"></span>
                    </span>

                    <span class="radio__label">Option 3</span>
                </label>
                
        </div> );
    }
}
 
export default Radio_;