import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';

import styles from './styles';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation='flipInY'
                    source={require('../../assets/logo.png')}
                    style={{width:100}}
                    resizeMode="contain"
                />
            </View>

            <Animatable.View delay={600} animation='flipInX' style={styles.containerForm}>
                <Text style={styles.title}>Sistema de monitoramento para camera fria.</Text>
                <Text style={styles.text}>Faça o login para começar.</Text>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

            </Animatable.View>



            





        </View>
    );
};