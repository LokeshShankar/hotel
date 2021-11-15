import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 22,
        textAlign: 'justify'
    },
    billTo: {
        // marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique',
        color: '#284646',
        fontSize: 11
    },
    userName: {
        fontSize:15
    },
    fields:{
        flexDirection:'row'
    }
  });
 

  const BillTo = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text style={styles.userName}>{invoice.userName}</Text>
        
        <View style={styles.fields}>
            <Text className="uaddress">{invoice.uaddress}</Text>
            <Text>, </Text>
            <Text className="uaddress">{invoice.ucity}</Text>
        </View>
        <View style={styles.fields}>
            <Text>pincode : </Text>
            <Text className="uaddress">{invoice.upincode}</Text>
        </View>

        <Text>{invoice.uphone}</Text>
        <Text>{invoice.uemail}</Text>
    </View>
    
// "userName": "fn1 ln1",
// "ucity": "c1",
// "uemail": "e1",
// "uphone": "ph1",
// "uaddress": "la1",
// "upincode": "p1",


  );
  
  export default BillTo