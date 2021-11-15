import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function ReportDropDown(){
    const options = [
        'Yearly', 'Weekly', 'Monthly', 'Quarterly','Daily'
      ]
      const _onSelect=()=>{}
      
      const defaultOption = options[0];
    return (
        <div>
        <Dropdown arrowClassName='myArrowClassName'
            options={options} 
            onChange={_onSelect} 
            value={defaultOption} 
            placeholder="Select an option"
            arrowClosed={<span className="arrow-closed" />}
           />

        </div>
       ) 
}

export default ReportDropDown