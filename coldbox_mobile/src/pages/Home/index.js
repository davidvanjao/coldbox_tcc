import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';

import styles from './styles';

export default function Homes() {

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={{width:'100%'}}
                    resizeMode="contain"
                />
            </View>

            





        </View>
    );
};