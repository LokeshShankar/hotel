import React from 'react';
import {View, StyleSheet, Text } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'
import RoomsTableRow from './RoomsTableRow';
import RoomsFooter from './RoomsFooter';


const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 30,
        borderWidth: 1,
        borderTopColor: '#fe414d',
        borderRightColor: '#fe414d',
        borderLeftColor: '#fe414d',
        borderBottomColor: 'white'
    },
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
        width: '45%',
        borderRightColor: '#fe414d',
        borderRightWidth: 1,
    },
  
    qty: {
        width: '15%',
        borderRightColor: '#fe414d',
        borderRightWidth: 1,
    },

    rate: {
        width: '20%',
        borderRightColor: '#fe414d',
        borderRightWidth: 1,
    }
});



  const RoomsItemsTable = ({invoice}) => (
    
    <View style={styles.tableContainer}>
        {/* <InvoiceTableHeader /> */}
        <View style={styles.container}>
            <Text style={styles.description}>ROOM TYPE</Text>
            <Text style={styles.rate}>RATE</Text>
            <Text style={styles.qty}>ROOM COUNT</Text>
            <Text style={styles.rate}>AMOUNT</Text>
        </View>
        <RoomsTableRow invoice={invoice} />
        {/* <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.items.length} /> */}
        {/* <InvoiceTableFooter items={invoice.items} /> */}

        <RoomsFooter invoice = {invoice}/>
        
    </View>
  );
  
  export default RoomsItemsTable;