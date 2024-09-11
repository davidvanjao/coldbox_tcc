import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native'; // Importa o useRoute

import styles from './styles';

export default function Grafico() {

    const route = useRoute(); // Usa o useRoute para acessar os parâmetros
    const { equipamentoId } = route.params; // Extrai o parâmetro passado (equipamentoId)

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
                            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                            datasets: [
                            {
                                data: [22, 23, 21, 21, 22.5, 24, 22], // Dados de temperatura
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