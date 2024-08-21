import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';

//graficos
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import styles from './styles';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem vindo ao sistema</Text>
        </View>
    );
};