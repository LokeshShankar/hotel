import React, { Component, Fragment } from 'react';
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from './Invoice'
// import invoice from './invoicedata'

// import logo from './logo.svg';
import '../../css/invoiceGenerationCheckout/MainInvoice.css';

function MainInvoice(props) {
    return (
        <Fragment>
            <PDFViewer className="MainInvoice" >
                <Invoice bookingId={props.location.state.bookingId}/>
            </PDFViewer>
        </Fragment>
    );
}
export default MainInvoice;