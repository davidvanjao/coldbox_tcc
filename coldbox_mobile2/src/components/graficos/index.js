import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import styles from './styles';

export default function Grafico({ equipamentoId }) {

    const [dadosEquipamento, setDadosEquipamento] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar informacoes do grafico
    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:3333/dados/${equipamentoId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Erro na requisição');
            }

            const data = await response.json();
            setDadosEquipamento(data.dados); // Acessa o array "dados" dentro da resposta da API
            setLoading(false);

        } catch (error) {

            alert('Erro ao buscar os dados');
            setLoading(false);
        }
    };

    // Fetch de dados com useEffect
    useEffect(() => {
        fetchData(); // Buscar dados ao carregar o componente ou quando `equipamentoId` mudar
    }, [equipamentoId]);  // Adiciona `equipamentoId` como dependência

    // Extrair dados e rótulos do array "dadosEquipamento"
    const labels = dadosEquipamento.map(dado => dado.hora); // Supondo que você tenha um campo "horario"
    const data = dadosEquipamento.map(dado => dado.media_temperatura); // Supondo que você tenha um campo "temperatura"
    

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (        
        <View>
            <Text style={styles.titulo}>Equipamento {equipamentoId}</Text>
            <View style={styles.grafico}>
                
                <View>
                    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 15 }}>
                        Variação de Temperatura (°C) em tempo real.
                    </Text>
                    <LineChart

                        data={{
                            labels: labels, // Usando os horários recebidos da API
                            datasets: [
                            {
                                data: data, // Usando as temperaturas recebidas da API
                            },
                            ],
                        }}

                        width={Dimensions.get('window').width - 65} // Largura ajustada com margem de 20 de cada lado
                        height={250} // Altura do gráfico
                        yAxisLabel="°C " // Rótulo no eixo Y indicando a unidade de medida
                        chartConfig={{
                        backgroundColor: '#1E2923',
                        backgroundGradientFrom: '#08130D',
                        backgroundGradientTo: '#1F4E45',
                        decimalPlaces: 1, // Exibe uma casa decimal
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726',
                        },
                        }}
                        bezier // Faz o gráfico de linha ter um efeito suave
                        style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        }}
                    />
                </View>



            </View>
        </View>        
    );
};