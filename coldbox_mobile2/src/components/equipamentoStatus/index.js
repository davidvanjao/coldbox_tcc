import React, { useEffect } from 'react';
import { View, Text, Alert, Pressable} from 'react-native';

export default function EquipamentoInfo() {

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