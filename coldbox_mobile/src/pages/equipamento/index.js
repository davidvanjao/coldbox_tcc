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
            <Text style={styles.titulo}>Equipamento A</Text>

            <View style={styles.grafico}>

            </View>


            <Pressable style={styles.status}  onPress={liberarAlerta}>
                <View style={styles.statusInfo}>
                    <Text>IDENTIFICADO ALTERAÇÃO NA TEMPERATURA</Text>
                    <Text>27/08/2024 - 22:21</Text>
                    <Text>TEMPERATURA: -6° Humidade: 10%</Text>
                </View>
            </Pressable>  

        </View>
    );
};