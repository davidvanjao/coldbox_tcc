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
            <Text style={styles.text}>Bem vindo ao sistema</Text>

        </View>
    );
};