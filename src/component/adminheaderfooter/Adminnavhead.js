import React from "react";
import { FaBars, FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../css/headerfooterstyles/Navhead.css";
class Adminnavhead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {/* <div className="navhead"><i><FaHotel /></i> <Link to="/admin" className="navhead-title">Admin Dashboard</Link></div>
        <input type="checkbox" id="click" />
        <label htmlFor="click" className="navbar-menu-btn">
        <i><FaBars /></i>
        </label>  */}

        <div className="navhead">
          <Link to="/admin" className="navhead-title">
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

export default Adminnavhead;
