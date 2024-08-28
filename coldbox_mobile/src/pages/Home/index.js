import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

//graficos

import styles from './styles';

export default function Home() {
    return (
        <View style={styles.container}>

            
            <Text style={styles.titulo}>Seja bem vindo David!</Text>               
            <Text style={styles.textoSimples}>Equipamentos disponiveis:</Text>            

            <TouchableOpacity style={styles.equipamento}>

                <View style={styles.equipamentoInfo}>
                    <Text style={styles.textoSimples}>Equip: Camera Fria 1</Text>
                    <Text style={styles.textoSimples}>Local: Supermercado Gaspar</Text>
                    <Text style={styles.textoSimples}>Ult. Comunicação: 27/08/2024 22:26</Text>
                </View>

                <View style={styles.equipamentoStatus}>
                    <Text style={styles.textoSimples}>5</Text>
                </View>

            </TouchableOpacity>

            


        </View>
    );
};