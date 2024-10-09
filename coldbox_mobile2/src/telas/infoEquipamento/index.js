import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native'; // Importa o useRoute

import styles from './styles';

import EquipamentoStatus from '../../components/equipamentoStatus';
import Grafico from '../../components/graficos';

export default function InfoEquipamento() {

    const route = useRoute(); // Usa o useRoute para acessar os parâmetros
    const { equipamentoId, id_usuario, id_cliente } = route.params; // Extrai os parâmetros passados

    const [reloadKey, setReloadKey] = useState(0); // Chave para forçar a atualização

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Atualiza o estado com um novo valor para forçar o re-render
            setReloadKey(prevKey => prevKey + 1);
        }, 10000); // A cada 10 segundos (10.000 ms)

        // Limpa o intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);
    }, []);


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