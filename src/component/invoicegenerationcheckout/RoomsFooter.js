import React from 'react'
import {Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
rowRoomCost: {
    flexDirection: 'row',
    borderBottomColor: '#fe414d',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontSize: 12,
    fontStyle: 'bold',
},
roomsCost: {
    width: '80%',
    textAlign: 'right',
    borderRightColor: '#fe414d',
    borderRightWidth: 1,
    paddingRight: 8
},

total: {
    width: '20%',
    textAlign: 'center',
    paddingRight: 8,
}
});

const RoomsFooter = ({invoice}) => {
    let roomCost = invoice.total;
    return(
        <View style={styles.rowRoomCost}>
            <Text style={styles.roomsCost}>Rooms Cost + GST (in Rs)</Text>
            <Text style={styles.total}>{roomCost}</Text>
        </View>
    );
}

export default RoomsFooter;