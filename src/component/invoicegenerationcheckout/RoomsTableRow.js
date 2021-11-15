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
        width: '45%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    rate: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    amount:{
        width:'20%',
        borderRightColor: 'white',
        textAlign: 'center'
    }
  });


const RoomsTableRow = ({invoice}) => {
    const rows = invoice.roomsBookedDetails.map( (item, index) => 
        <View style={styles.row} key={index}>
            <Text style={styles.description}>{item.roomType}</Text>
            <Text style={styles.rate}>{item.roomPrice}</Text>
            <Text style={styles.qty}>{item.roomsBooked}</Text>
            <Text style={styles.amount}>{item.roomPrice*item.roomsBooked}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default RoomsTableRow