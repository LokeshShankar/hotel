import React from "react";
import { FaBars, FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../css/headerfooterstyles/Navhead.css";
import { APPLICATION_NAME } from "../utility/Constant";
class NavHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="navhead">
          <Link to="/" className="navhead-title">
            <img src="/images/logo.png" width="auto" height="80px"></img>
          </Link>
        </div>
        <input type="checkbox" id="click" />
        <label htmlFor="click" className="navbar-menu-btn">
          <i>
            <FaBars />
          </i>
        </label>
      </>
    );
  }
}

export default NavHead;
