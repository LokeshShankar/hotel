import React from "react";
import Login from "../login/Login";
import {Route} from "react-router-dom";
import Otp from "../otp/Otp";
import Header from "../headerandfooter/Header";
import Footer from "../headerandfooter/Footer";

class User extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Route path="/user/signin">
                    <Login/>
                </Route>
                <Route exact path="/user/otp">
                    <Otp/>
                </Route>
                <Footer/>
            </div>
        );
    }
}

export default User;