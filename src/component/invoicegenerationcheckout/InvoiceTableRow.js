import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#fe414d'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#fe414d',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '35%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    time: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    rate: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    discount: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'center',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( (item, index) => 
        <View style={styles.row} key={index}>
            <Text style={styles.description}>{item[0]}</Text>
            <Text style={styles.time}>{item[1]}</Text>
            <Text style={styles.rate}>{item[3]}</Text>
            <Text style={styles.qty}>{item[2]}</Text>
            <Text style={styles.discount}>{item[4]}</Text>
            <Text style={styles.amount}>{item[5]}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow