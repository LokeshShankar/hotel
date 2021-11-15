import React from "react";
import AddHotel from "./AddHotel";
import { STATEOBJECT } from "../utility/Constant";

class AddDetails extends React.Component {
  state = STATEOBJECT;

  resetState = () => {
    this.setState(STATEOBJECT);
  };
  completed = () => {
    this.props.history.push({
      pathname: "/admin",
    });
  };
  render() {
    //    console.log(STATEOBJECT);
    return (
      <AddHotel
        {...this.state}
        resetState={this.resetState}
        completed={this.completed}
      />
    );
  }
}

export default AddDetails;
