import React, { useState } from "react";
import Cookies from "universal-cookie/lib";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "../../css/otp/otp.css";
import {  LOGIN_SERVICE_BASE_URL, USER_SERVICE_BASE_URL } from "../utility/Constant";
import Timer from "../login/Timer";
import AlertBox from "../alertBox/AlertBox";


const OTPBox = (props) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isCorrect, setCorrect] = useState(true);
  const [isflag1, setflag1] = useState(true);
  const [isflag2, setflag2] = useState(false);
  const [isflag3, setflag3] = useState(false);
  const email = props.location.state.email;

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setAuthenticated(false);
    setCorrect(true);
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input / previous input accordingly
    /* istanbul ignore if*/
    if (element.value === "") {
      if (element.previousSibling) {
        element.previousSibling.focus();
      }
    } else {
      /* istanbul ignore if*/
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };
  const reSubmit = async (e) => {
    e.preventDefault();
    setflag1(!isflag1);
    setflag2(!isflag2);
    setCorrect(true);
    let generate_otp=USER_SERVICE_BASE_URL+'/otp/generate/'+email;
    await axios
        .post(generate_otp)
        .then((response) => {
          setflag3(true);
          // this.setState({ response: response.data });
        })
        .catch((error) => {
          // console.log(error + " this is error");
          // this.state.err = error;
          //this.setState({err:error})
        });
  };
  const handleErrorClose = () => {
    setflag3(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Update URL if necessary
    const URL = LOGIN_SERVICE_BASE_URL + "/login";

    await axios
      .post(
        URL,
        {},
        {
          headers: {
            username: email, // TODO: Get this from redux
            code: otp.join(""),
          },
        }
      )
      .then((response) => {
        setAuthenticated(true);
        let jwtToken = response.data;
        const jwtTokenCookie = new Cookies();
        jwtTokenCookie.set("jwtToken", jwtToken, { path: "/" });

        let decodedToken = jwt_decode(jwtToken);

        // TODO: Confirm where to redirect for super admin
        if (decodedToken["role"] === "admin") {
          // if role ==='ROLE_ADMIN' --> admin dashboard
          props.history.push({
            pathname: "/admin",
          });
        } else {
          // if role ==='ROLE_USER' --> home page
          props.history.push({
            pathname: "/",
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        //console.log(error);
        setCorrect(false);
      });
  };

  return (
    <div className="--form-card-publicis">
      <div className="--form-card-publicis-header">Enter the OTP </div>
      <div className="--form-card-publicis-body">
        <div className="otp-container">
          {otp.map((data, index) => {
            return (
              <input
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>
        <div className="button-container">
      
          <div>
            <button className="btn--publicis-primary" onClick={(e) => setOtp([...otp.map((v) => "")])}>
              Clear All
            </button>
          </div>
          <div>
            <button className="btn--publicis-primary" onClick={handleSubmit}>Verify OTP</button>
          </div>
          <div>
            <button className="btn--publicis-primary" onClick={reSubmit}>Resend OTP</button>
          </div>
       </div>
        <div className="otp-timer-container">
          {isflag1 && <Timer startCount='60' />}
          {isflag2 && <Timer startCount='60' />}
        </div>
        <div className="Response otp-timer-container">
        {isflag3 && <AlertBox severity="success"  handleClose={handleErrorClose} >OTP Sent!</AlertBox>}
        
          {isAuthenticated && <p>Authenticated!</p>}
          {!isCorrect && <p>Incorrect OTP!</p>}
        </div>
      </div>

    </div>
  );
};

export default OTPBox;
