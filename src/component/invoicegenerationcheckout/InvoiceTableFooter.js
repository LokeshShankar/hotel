import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#fe414d'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    
    total: {
        width: '15%',
        textAlign: 'center',
        paddingRight: 8,
    },
  });


const InvoiceTableFooter = ({items}) => {
    const total = items.map(item => item[5])
        .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
    return(    
        <View style={styles.row}>
            <Text style={styles.description}>Services Cost + GST (in Rs)</Text>
            <Text style={styles.total}>{ Number.parseFloat(total).toFixed(2)}</Text>
        </View>
    )
};
  
  export default InvoiceTableFooter
  