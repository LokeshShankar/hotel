import React from "react";
import { Link } from "react-router-dom";
import "../../css/headerfooterstyles/Navbar.css";
import NavHead from "./NavHead";
import Cookies from "universal-cookie";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: this.props.isLoggedIn };
  }

  logout = () => {
    this.setState({ isLoggedIn: false });
    const jwtTokenCookie = new Cookies();
    jwtTokenCookie.remove("jwtToken");
    window.location.href = "./";
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
        <NavHead />
        <ul className="navitems">
          <li className="navitems-li">
            <Link className="navitems-link" to="/">
              Home
            </Link>
          </li>
          <li className="navitems-li">
            <Link className="navitems-link" to="/about">
              About
            </Link>
          </li>

          {isLoggedIn && (
            <li className="navitems-li">
              <Link className="navitems-link" to="/bookings">
                My Bookings
              </Link>
            </li>
          )}

          {isLoggedIn && (
            <li className="navitems-li">
              <Link className="navitems-link" to="/profile">
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
          {!isLoggedIn && (
            <li className="navitems-li">
              <Link className="navitems-link" to="/signin">
                LogIn
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li className="navitems-li">
              <Link className="navitems-link" to="/register">
                SignUp
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  isLoggedIn: false,
};
export default Navbar;
