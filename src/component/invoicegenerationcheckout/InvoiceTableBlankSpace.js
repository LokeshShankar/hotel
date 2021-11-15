import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
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
        width: '15%',
    },
   
  });

const InvoiceTableBlankSpace = ({rowsCount}) => {
    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map( (x, i) => 
        <View style={styles.row} key={`BR${i}`}>
            <Text style={styles.description}>-</Text>
            <Text style={styles.time}>-</Text>
            <Text style={styles.qty}>-</Text>
            <Text style={styles.rate}>-</Text>
            <Text style={styles.discount}>-</Text>
            <Text style={styles.amount}>-</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableBlankSpace