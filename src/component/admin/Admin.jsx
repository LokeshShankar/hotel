import React, { Component } from "react";
import Footer from "../headerandfooter/Footer";
import Adminheader from "../adminheaderfooter/Adminheader";
import "../../css/admin/adminimage.css";
import DeleteHotel from "../editanddeletehotel/DeleteHotel";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddDetails from "../addhotel/AddDetails";
import UnlockUser from "../unlockuser/unlockuser";
import AddAdmin from "./AddAdmin";
import ReportPage from "../reportSearch/reportpage";
import BillEntry from "../bill/BillEntry";
import HotelsPageAdmin from "../viewhotelsadmin/HotelsPageAdmin";
import CheckIn from "../checkin/CheckIn";
import CheckOut from "../checkout/CheckOut";
import EditHotel from "../editanddeletehotel/EditHotel";
import AddHotel from "../addhotel/AddHotel";
import AllBill from "../bill/AllBills";
import Adminbookinghistory from "../bookingHistory/adminbookinghistory";
import Profile from "../profile/Profile";
import ChangePassword_ from "../profile/ChangePasswordForm";
import MainInvoice from "../invoicegenerationcheckout/MainInvoice";
import Analytics from "../analytics/analytics";
import DisplayCommission from "../commission-ui/DisplayCommission";
import ScrollToTop from "../../ScrollToTop";
import AnalyticsHotel from "../analytics/analyticshotel";
import HotelBillServices from "../hotelBillServices/HotelBillServices";

class Admin extends Component {
  state = {};

  componentDidMount() {
    this.props.navbarToggle();
  }

  componentWillUnmount() {
    this.props.navbarToggle();
  }

  render() {
    // let jwtTokenCookie = new Cookies();
    // jwtTokenCookie.set(
    //   "jwtToken",
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwic3ViIjoiMTIzNDU2Nzg5MCIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.qF6CAMcfDF4LNilNOIHfYqlckcefPzJ-wcEsBtrX2Ms",
    //   { path: "/" }
    // );
    return (
      <React.Fragment>
        <Router>
          <Adminheader />
          <ScrollToTop>
            <Switch>
              <Route exact path="/admin" component={HotelsPageAdmin} />
              <Route path="/admin/add" component={AddDetails} />
              <Route path="/admin/unlockuser" component={UnlockUser} />
              <Route path="/admin/addAdmin" component={AddAdmin} />
              <Route path="/admin/billEntry" component={BillEntry} />
              <Route exact path="/admin/report" component={ReportPage} />
              <Route exact path="/admin/invoice" component={MainInvoice} />
              <Route
                exact
                path="/admin/bookings"
                component={Adminbookinghistory}
              />
              <Route exact path="/admin/allbills" component={AllBill} />
              <Route exact path="/admin/analysis" component={Analytics} />
              <Route
                exact
                path="/admin/analysis/:hotelId"
                component={AnalyticsHotel}
              />
              <Route exact path="/admin/checkin" component={CheckIn} />
              <Route exact path="/admin/checkout" component={CheckOut} />
              <Route exact path="/admin/editHotel" component={EditHotel} />
              <Route exact path="/admin/deleteHotel" component={DeleteHotel} />
              <Route exact path="/admin/profile" component={Profile} />
              <Route
                exact
                path="/admin/commission"
                component={DisplayCommission}
              />
              <Route
                exact
                path="/change-password"
                component={ChangePassword_}
              />
              <Route
                exact
                path="/admin/hotelbillservices"
                component={HotelBillServices}
              />
            </Switch>
          </ScrollToTop>
        </Router>
      </React.Fragment>
    );
  }
}

export default Admin;
