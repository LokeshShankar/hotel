import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 20,
        display: 'inline',
    },
    hotelDetails: {
        // marginTop: 11,
        paddingBottom: 5,
        fontFamily: 'Helvetica-Oblique',
        color: '#284646'
    },
    fields:{
      flexDirection:'row'
    }
  });


  const HotelDetails = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.hotelDetails}>Hotel Details:</Text>
        <Text>{invoice.hotelName}</Text>
        
        {/* <Text>{invoice.hreg}</Text> */}
        <View style={styles.fields}>
          <Text>{invoice.hlocAdd}</Text>
          <Text>, </Text>
          <Text>{invoice.hlandMarks}</Text>
          <Text>, </Text>
          <Text>{invoice.hcity}</Text>
        </View>
        <View style={styles.fields}>
          <Text>pincode : </Text>
          <Text>{invoice.hpincode}</Text>
        </View>
        <Text>{invoice.hphone}</Text>
        <Text>{invoice.hemail}</Text>
    </View>
  );
//   "hemail": "e1",
//   "hphone": "12334",
//   "hlocAdd": "la1",
//   "hotelName": "jaswanth1"
//   "hreg": "r1",
//   "hlandMarks": "il1,il2",
//   "hcity": "c2",
//   "hpincode": "pc1"
  
  export default HotelDetails