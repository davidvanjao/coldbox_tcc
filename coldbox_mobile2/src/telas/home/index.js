import React from 'react';
import { View, Text} from 'react-native';
import { useState, useEffect } from 'react';
//import Equipamento from '../../components/equipamento';

import styles from './styles';

export default function Home({route}) {    
    

    const { user_id, token } = route.params || {};  // Acessa os parâmetros enviados

    console.log('Recebido em Home:', user_id, token);  // Verifica se os parâmetros foram recebidos
    console.log(route);
    
    return (
        <View style={styles.container}>                      
            <Text style={styles.textoSimples}>Equipamentos disponiveis: {user_id}</Text>
        </View>
    );
};
