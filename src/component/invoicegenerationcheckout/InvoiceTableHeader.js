import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#fe414d'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#fe414d',
        backgroundColor: '#fe414d',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        color: 'white',
        fontWeight: 900
    },
    description: {
        width: '35%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },

    time: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
  
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },

    discount: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },

    amount: {
        width: '15%'
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>DESCRIPTION</Text>
        <Text style={styles.time}>TIME</Text>
        <Text style={styles.qty}>QUANTITY</Text>
        <Text style={styles.rate}>RATE</Text>
        <Text style={styles.discount}>DISCOUNT</Text>
        <Text style={styles.amount}>AMOUNT</Text>
    </View>
  );
  
  export default InvoiceTableHeader