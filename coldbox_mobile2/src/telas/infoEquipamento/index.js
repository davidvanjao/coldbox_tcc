import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native'; // Importa o useRoute

import styles from './styles';

import EquipamentoStatus from '../../components/equipamentoStatus';
import Grafico from '../../components/graficos';

export default function InfoEquipamento() {

    const route = useRoute(); // Usa o useRoute para acessar os parâmetros
    const { equipamentoId, id_usuario, id_cliente } = route.params; // Extrai os parâmetros passados


    return (           
        <View style={styles.container}>

            <Grafico
                equipamentoId={equipamentoId} 
                id_usuario={id_usuario} 
                id_cliente={id_cliente} 
            />



            <EquipamentoStatus
                equipamentoId={equipamentoId} 
                id_usuario={id_usuario} 
                id_cliente={id_cliente} 
            />
        </View>
    );
};