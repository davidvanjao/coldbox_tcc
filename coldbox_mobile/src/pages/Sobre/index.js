import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';

import styles from './styles';

export default function Sobre() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sobre</Text>
        </View>
    );
};