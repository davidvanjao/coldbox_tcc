import React, { useEffect } from 'react';
import { View, Text, Alert, Pressable} from 'react-native';

import styles from './styles'; 

function liberarAlerta(e) {

    Alert.alert('Alert Title', 'My Alert Msg', [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

}



export default function Equipamento() {

    return (

        <View style={styles.container}>

        </View>
    );
};