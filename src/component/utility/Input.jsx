import React from "react";
import PropTypes from "prop-types";
import "../../css/utility/input.css";
import Message from "./Message";

export const Input = ({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  error,
  children,
  label,
  labelClassName,
  min,
  max,
  ...props
}) => {
  return (
    <React.Fragment>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        min={min}
        max={max}
        className={className}
        style={error && { border: "solid 2px red" }}
      />
      {error && <Message msgtype="error" msg={error} />}
      {error && <p>{error}</p>}
    </React.Fragment>
  );
};

Input.defaultProps = {
  type: "text",
  className: "",
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "password", "date", "time","email"]),
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
