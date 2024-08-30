import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function Equipamento() {
    return (

        <View style={styles.container}>
            <Text style={styles.titulo}>Equipamento A</Text>

            <View style={styles.grafico}>

            </View>

            <TouchableOpacity style={styles.status} 
                onPress={() => alert('Alerta verificado')}
            >
                <View style={styles.statusInfo}>
                    <Text>IDENTIFICADO ALTERAÇÃO NA TEMPERATURA</Text>
                    <Text>27/08/2024 - 22:21</Text>
                    <Text>TEMPERATURA: -6° Humidade: 10%</Text>
                </View>
            </TouchableOpacity>      







        </View>
    );
};