import React from 'react';
import { View, Text, Pressable} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import styles from './styles';

export default function Menu(props) {

    const handleLogout = async () => {
        // Remove o token ao fazer logout
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('LoginScreen');
    };

    return (

        <View>

            <View>
                <Pressable
                    style={styles.viewDrawer}
                    onPress={() => props.navigation.navigate('Home')}
                    >
                    <Text style={styles.txtDrawer}>Home</Text>
                </Pressable>
            </View>

            <View>
                <Pressable
                    style={styles.viewDrawer}
                    onPress={() => props.navigation.navigate('Configuracao')}
                    >
                    <Text style={styles.txtDrawer}>Configuração</Text>
                </Pressable>
            </View>

            <View>
                <Pressable
                    style={styles.viewDrawer}
                    onPress={() => props.navigation.navigate('Sobre')}
                    >
                    <Text style={styles.txtDrawer}>Sobre</Text>
                </Pressable>
            </View>

            <View>
                <Pressable
                    style={styles.viewDrawer}
                    onPress={handleLogout}
                    >
                    <Text style={styles.txtDrawer}>Logoff</Text>
                </Pressable>
            </View>
        </View>
    );
};