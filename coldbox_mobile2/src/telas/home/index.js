import React, { useEffect, useState } from 'react';
import { View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Equipamento from '../../components/equipamento';
import styles from './styles';

export default function Home({route}) {    
    const [token, setToken] = useState(null); // Estado para armazenar o token
    const [teste, setTeste] = useState('david'); // Estado para armazenar o token
    
    // Função para buscar o token do AsyncStorage
    const getToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (storedToken !== null) {
                setToken(storedToken); // Atualiza o estado com o token
                console.log('Token recuperado:', storedToken);
            } else {
                console.log('Nenhum token encontrado');
            }
        } catch (error) {
            console.error('Erro ao recuperar o token:', error);
        }
    };

    // useEffect para buscar o token quando o componente for montado
    useEffect(() => {
        getToken();
    }, []);
    
    
    return (
        <View style={styles.container}>                      
            <Text style={styles.textoSimples}>Equipamentos disponiveis: definir quantidade de usuarios</Text>
            <Equipamento usuario={token}/>
        </View>
    );
};
