import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native'; // Importa o useRoute

import AsyncStorage from '@react-native-async-storage/async-storage'; //usado para gerar token

import styles from './styles';

export default function EquipamentoStatus() {

    const route = useRoute(); // Usa o useRoute para acessar os parâmetros
    const { equipamentoId } = route.params; // Extrai o parâmetro passado (equipamentoId)


    const [statusEquipamento, setStatusEquipamento] = useState([]);
    const [loading, setLoading] = useState(true);

    const [token, setToken] = useState(null); // Estado para armazenar o token

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

    const usuarioVisualizou = (alertEnviado_id) => {(

        alert(token)

    )};

    //funcao para formatar data
    const formatarDataHoraBrasileira = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3333/logs/listarNotificacoesNaoVisualizadas/${equipamentoId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }

                const data = await response.json();
                setStatusEquipamento(data.dados); // Acessa o array "dados" dentro da resposta da API
                setLoading(false);

            } catch (error) {
                alert('Erro ao buscar os dados');
                setLoading(false);
            }
        };

        fetchData();

        //Configura o intervalo para atualizar os dados a cada X milissegundos
        const intervalId = setInterval(() => {
            fetchData();
        }, 10000); // Atualiza a cada 10 segundos (10.000 ms)

        //Limpa o intervalo ao desmontar o componente
        return () => clearInterval(intervalId);

    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            {/* Usando map para iterar sobre a lista de equipamentos */}
            {statusEquipamento.map((item) => (
                <Pressable
                    key={item.equip_id} // Adicionando uma chave única    
                    style={styles.campoStatus}                
                    onPress={() => usuarioVisualizou(item.alertEnviado_id)}
                    >

                    <View>
                        <Text  style={styles.titulo}>{item.alerta_tipo}</Text>
                        {/* Exibindo o horário formatado */}
                        <Text>Horário: {item.alertEnviado_data 
                            ? formatarDataHoraBrasileira(item.alertEnviado_data) 
                            : 'Carregando...'}
                        </Text>

                        <Text>Temp. Registrada:  
                            <Text style={{ fontWeight: 'bold', color: 'red', marginLeft:10 }}>
                                {item.dados_temp}
                            </Text>                            
                        </Text>
                    </View>

                </Pressable>
            ))}
        </View>

    );
};