import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 10,
        // justifyContent: 'end',
        marginLeft: 120,
        textAlign: 'justify'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        // justifyContent: 'end',
        marginLeft: 120
    },
    invoiceDate: {
            fontSize: 12,
    },
    idLabel: {
        width:52,
        color:'#284646'
    },
    dateLabel:{
        width: 30,
        color:'#284646'
    }

});

    let today = new Date();
    let currentDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  const InvoiceNo = ({invoice}) => (
        <View>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.idLabel}>Invoice ID :</Text>
                <Text style={styles.invoiceDate}>{invoice.invoice_id}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.dateLabel}>Date :</Text>
                <Text >{currentDate}</Text>
            </View >
        </View>
  );
  
  export default InvoiceNo