import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from './styles';

export default function Homes() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem vindo!</Text>            
        </View>
    );
};