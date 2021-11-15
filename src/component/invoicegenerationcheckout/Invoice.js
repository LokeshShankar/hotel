import React, { useEffect } from "react";
import {
  Text,
  Page,
  Document,
  Image,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import HotelDetails from "./HotelDetails";
import InvoiceNo from "./InvoiceNo";
import axios from "axios";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import "../../css/invoiceGenerationCheckout/MainInvoice.css";
import { USER_SERVICE_BASE_URL } from "../utility/Constant";
import { Component } from "react";
import "../../css/invoiceGenerationCheckout/MainInvoice.css";
import RoomsItemsTable from "./RoomsItemsTable";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    lineHeight: 1.4,
    objectFit: "cover",
    overflow: "hidden",
  },
  logo: {
    width: 90,
    height: 70,
  },
  heading: {
    fontSize: 25,
    color: "#fe414d",
    textAlign: "center",
    paddingTop: 5,
    marginLeft: 130,
  },
  fields: {
    flexDirection: "row",
  },
  amount: {
    marginTop: 20,
    marginLeft: 350,
  },
  amountDue: {
    color: "#284646",
    fontSize: 11,
  },
  amountValue: {
    fontSize: 15,
    fontWeight: "bold",
  },
  payments: {
    flexDirection: "row",
  },
  advance: {
    marginTop: 20,
  },
});

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: null,
    };
  }

  getInvoice = () => {
    let bookingId = this.props.bookingId;
    axios
      .get(
        USER_SERVICE_BASE_URL +
          "/bookings/" +
          this.props.bookingId +
          "/getInvoiceData"
      )
      .then((response) => {
        let invoice = response.data;
        //        console.log(invoice);
        this.setState({ invoice: invoice });
        //console.log(response.data);
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  componentDidMount() {
    this.getInvoice();
  }

  render() {
    if (this.state.invoice) {
      let invoice = this.state.invoice;
      let advance = invoice.advance;
      let serviceCost = 0;
      let roomsCost = invoice.total;
      for (let i = 0; i < invoice.items.length; i++) {
        serviceCost = serviceCost + invoice.items[i][5];
      }

      let dueAmount = roomsCost + serviceCost - advance;
      return (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.fields}>
              <Image style={styles.logo} src="/images/logo.png" />
              <Text style={styles.heading}>INVOICE</Text>
              <InvoiceNo invoice={invoice} />
            </View>
            {/* <InvoiceTitle title={APPLICATION_NAME}/> */}
            <View style={styles.fields}>
              <BillTo invoice={invoice} />
            </View>
            <HotelDetails invoice={invoice} />
            <RoomsItemsTable invoice={invoice} />
            <InvoiceItemsTable invoice={invoice} />
            <View style={styles.payments}>
              <View style={styles.advance}>
                <Text style={styles.amountDue}>Advance Payment : </Text>
                <Text style={styles.amountValue}>Rs {advance}</Text>
              </View>
              <View style={styles.amount}>
                <Text style={styles.amountDue}>Amount Due : </Text>
                <Text style={styles.amountValue}>Rs {dueAmount}</Text>
              </View>
            </View>
            <InvoiceThankYouMsg />
          </Page>
        </Document>
      );
    } else return <div>Invoice not Found</div>;
  }
}

export default Invoice;
