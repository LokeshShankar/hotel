import React from "react";
import { Link } from "react-router-dom";
import AddAdmin from "../admin/AddAdmin";
import "../../css/headerfooterstyles/Navbar.css";
import Cookies from "universal-cookie";
import Adminnavhead from "./Adminnavhead";

class Adminnavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: this.props.isLoggedIn };
  }
  login = () => {
    this.setState({ isLoggedIn: true });
  };
  logout = () => {
    this.setState({ isLoggedIn: false });
    const jwtTokenCookie = new Cookies();
    jwtTokenCookie.remove("jwtToken");
    window.location.href = "/";
  };
  render() {
    const jwtTokenCookie = new Cookies();
    let user = jwtTokenCookie.get("jwtToken");
    if (user !== undefined && this.state.isLoggedIn === false) {
      this.setState({ isLoggedIn: true });
    }
    let isLoggedIn = this.state.isLoggedIn;
    return (
      <nav className="navbar">
        <Adminnavhead />
        <ul className="navitems">
          <li className="navitems-li">
            <Link className="navitems-link" to="/admin">
              Home
            </Link>
          </li>
          <li className="navitems-li">
            <Link className="navitems-link" to="/admin/add">
              Hotel Add
            </Link>
          </li>
          <li className="navitems-li">
            <Link className="navitems-link" to="/admin/unlockuser">
              Unlock User
            </Link>
          </li>
          <li className="navitems-li">
            <Link className="navitems-link" to="/admin/report">
              Report
            </Link>
          </li>
          <li className="navitems-li">
            <Link className="navitems-link" to="/admin/analysis">
              Analytics
            </Link>
          </li>
          {isLoggedIn && (
            <li className="navitems-li">
              <Link
                className="navitems-link"
                to="/admin/profile"
              >
                Profile
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="navitems-li">
              <Link
                className="navitems-link"
                to="/signout"
                onClick={this.logout}
              >
                LogOut
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
Adminnavbar.defaultProps = {
  isLoggedIn: false,
};
export default Adminnavbar;
