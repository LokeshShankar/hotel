import React from "react";
import "../../css/utility/button.css";
import { BTN_SIZES, BTN_STYLES } from "./Constant";

const STYLES = BTN_STYLES;
const SIZES = BTN_SIZES;

class Button extends React.Component {
  state = {};
  render() {
    const checkButtonStyle = STYLES.includes(this.props.buttonStyle)
      ? this.props.buttonStyle
      : "";
    const checkButtonSize = SIZES.includes(this.props.buttonSize)
      ? this.props.buttonSize
      : "";
    // Incase we want to use a custom css for button then both buttonStyle ans buttonSize can be left empty
    if (checkButtonStyle === "" && checkButtonSize === "") {
      return (
        <button
          className={this.props.cssClassName}
          onClick={this.props.handleClick}
          type={this.props.type}
        >
          {this.props.label}
        </button>
      );
    } else {
      return (
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={this.props.handleClick}
          type={this.props.type}
        >
          {this.props.label}
        </button>
      );
    }
  }
}

export default Button;
