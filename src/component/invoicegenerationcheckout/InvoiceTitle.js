import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 18,
    },
    reportTitle:{
        color: 'red',
        letterSpacing: 0.1,
        fontSize: 20,
        textTransform: 'uppercase',
    }
  });


  const InvoiceTitle = ({title}) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
  
  export default InvoiceTitle