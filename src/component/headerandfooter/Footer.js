import React from "react";
import {
  FaEnvelope,
  FaFacebookSquare,
  FaInstagram,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "../../css/headerfooterstyles/Footer.css";
import { APPLICATION_NAME } from "../utility/Constant";
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer>
        <div className="content">
          <div className="box">
            <div className="upper">
              <div className="topic">About us</div>
              <p>
                {APPLICATION_NAME} is a one solution to your all accomodation
                related problems. Here you can find the best hotel rooms in
                affordable prices. Our only motive is to give our customer the
                best deal.
              </p>
            </div>
            <div className="bottom">
              <a href="/">{APPLICATION_NAME}</a><br/>
              <a href = "/policy">terms and conditions</a>
              <p>Copyright © 2021 | All rights reserved</p>
            </div>

          </div>
          <div className="right box">
            <div className="lower">
              <div className="topic">Contact us</div>
              <div className="phone">
                <a href="#">
                  <i>
                    <FaPhone />
                  </i>
                  1800-111-1111
                </a>
              </div>
              <div className="email">
                <a href="#">
                  <i>
                    <FaEnvelope />
                  </i>
                  helpdesk@bookrightaway.com
                </a>
              </div>
            </div>
            <div className="media-icons">
              <a href="#" aria-label="Facebbok">
                {" "}
                <FaFacebookSquare />{" "}
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />{" "}
              </a>
              <a href="#" aria-label="Youtube">
                {" "}
                <FaYoutube />{" "}
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
