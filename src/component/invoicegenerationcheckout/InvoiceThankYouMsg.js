import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 100,
        marginLeft:200
    },
    reportTitle:{
        fontSize: 12
    }
  });


  const InvoiceThankYouMsg = () => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Thank you for visiting</Text>
    </View>
  );
  
  export default InvoiceThankYouMsg