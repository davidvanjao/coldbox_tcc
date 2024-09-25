import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native'; // Importa o useRoute

import styles from './styles';

export default function EquipamentoStatus() {

    const route = useRoute(); // Usa o useRoute para acessar os parâmetros
    const { equipamentoId } = route.params; // Extrai o parâmetro passado (equipamentoId)

    const [statusEquipamento, setStatusEquipamento] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    
                    onPress={() => alert('teste')}
                >

                    <View>
                        <Text>{item.alerta_tipo}</Text>
                        <Text>{item.alertEnviado_data}</Text>
                        <Text>{item.dados_temp}</Text>
                    </View>

                </Pressable>
            ))}
        </View>

    );
};