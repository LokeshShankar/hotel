import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./component/headerandfooter/Header";
import Footer from "./component/headerandfooter/Footer";
import ScrollToTop from "./ScrollToTop";

// import Login from "./component/login/Login";
const Login = lazy(() => import("./component/login/Login"));
// import Register from "./component/register/Register";
const Register = lazy(() => import("./component/register/Register"));

// import Otp from "./component/otp/Otp";
const Otp = lazy(() => import("./component/otp/Otp"));
// import EmailForPasswordReset from "./component/ForgotPassword/EmailForPasswordReset";
const EmailForPasswordReset = lazy(() =>
  import("./component/ForgotPassword/EmailForPasswordReset")
);
// import PasswordReset from "./component/ForgotPassword/PasswordReset";
const PasswordReset = lazy(() =>
  import("./component/ForgotPassword/PasswordReset")
);
// import Admin from "./component/admin/Admin";
const Admin = lazy(() => import("./component/admin/Admin"));
// import UserLandingPage from "./component/userlandingpage/userlandingpage";
const UserLandingPage = lazy(() =>
  import("./component/userlandingpage/userlandingpage")
);
// import SearchResultsPage from "./component/searchresultspage/searchresults";
const SearchResultsPage = lazy(() =>
  import("./component/searchresultspage/searchresults")
);
// import Hotel from "./component/reviewDetails/Hotel";
const Hotel = lazy(() => import("./component/reviewDetails/Hotel"));
// import UserBookingHistory from "./component/bookingHistory/userbookinghistory";
const UserBookingHistory = lazy(() =>
  import("./component/bookingHistory/userbookinghistory")
);
// import BookingDetails from "./component/booking/BookingDetails";
const BookingDetails = lazy(() => import("./component/booking/BookingDetails"));
// import RoomAvailabilityPage from "./component/roomavailability/roomavailabilitypage";
const RoomAvailabilityPage = lazy(() =>
  import("./component/roomavailability/roomavailabilitypage")
);
// import UserPaymentReport from "./component/userReport/UserPaymentReport";
const UserPaymentReport = lazy(() =>
  import("./component/userReport/UserPaymentReport")
);
// import HotelPaymentReport from "./component/userReport/HotelPaymentReport";
const HotelPaymentReport = lazy(() =>
  import("./component/userReport/HotelPaymentReport")
);
// import Aboutus from "./component/aboutUs/Aboutus";
const Aboutus = lazy(() => import("./component/aboutUs/Aboutus"));
// import Profile from "./component/profile/Profile";
const Profile = lazy(() => import("./component/profile/Profile"));
// import ChangePassword_ from "./component/profile/ChangePasswordForm";
const ChangePassword_ = lazy(() =>
  import("./component/profile/ChangePasswordForm")
);
// import MainInvoice from "./component/invoicegenerationcheckout/MainInvoice";
const MainInvoice = lazy(() =>
  import("./component/invoicegenerationcheckout/MainInvoice")
);
// import Policy from "./component/TermsAndConditions/policy"
const Policy = lazy(() => import("./component/TermsAndConditions/policy"));
// import HotelBillServices from "./component/hotelBillServices/HotelBillServices";
const HotelBillServices = lazy(() =>
  import("./component/hotelBillServices/HotelBillServices")
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navbarHidden: false };
  }

  toggle = () => {
    let navbarHidden = !this.state.navbarHidden;
    this.setState({ navbarHidden });
  };

  render() {
    //logger('info', 'this is for checking') //logger(level, message)

    return (
      <Suspense
        fallback={
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        }
      >
        {!this.state.navbarHidden ? <Header /> : null}
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={UserLandingPage} />
            <Route
              exact
              path="/roomsavailable"
              component={RoomAvailabilityPage}
            />
            <Route exact path="/search" component={SearchResultsPage} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/change-password" component={ChangePassword_} />
            <Route exact path="/hoteldetail/:hotelId" component={Hotel} />
            <Route exact path="/hoteldetail" component={Hotel} />
            <Route exact path="/booking" component={BookingDetails} />
            <Route exact path="/signin" component={Login} />
            <Route
              exact
              path="/userbookinghistory"
              component={UserBookingHistory}
            />
            <Route
              exact
              path="/emailforpasswordreset"
              component={EmailForPasswordReset}
            />
            <Route exact path="/passwordreset" component={PasswordReset} />
            <Route
              exact
              path="/hotelbillservices"
              component={HotelBillServices}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/otp" component={Otp} />
            <Route exact path="/bookings" component={UserBookingHistory} />
            <Route exact path="/about" component={Aboutus} />
            <Route exact path="/invoice" component={MainInvoice} />
            <Route exact path="/policy" component={Policy} />
            <Route
              exact
              path="/userpaymentreport"
              component={UserPaymentReport}
            />
            <Route
              exact
              path="/hotelpaymentreport"
              component={HotelPaymentReport}
            />
            <Route exact path="/admin**">
              <Admin navbarToggle={this.toggle} />
            </Route>
          </Switch>
        </ScrollToTop>
        <Footer />
      </Suspense>
    );
  }
}

export default App;
