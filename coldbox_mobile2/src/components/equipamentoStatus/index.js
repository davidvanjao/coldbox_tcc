import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import styles from './styles';

export default function EquipamentoStatus({ equipamentoId, id_usuario, reloadKey}) {

    const [statusEquipamento, setStatusEquipamento] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar as notificações não visualizadas
    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:3333/logs/listarNotificacoesNaoVisualizadas/${equipamentoId}`,
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
            setStatusEquipamento(data.dados); // Acessa o array "dados" dentro da resposta da API
            setLoading(false);
        } catch (error) {
            alert('Erro ao buscar os dados');
            setLoading(false);
        }
    };

    // Função para marcar uma notificação como visualizada
    const usuarioVisualizou = async (alertEnviado_id) => {
        try {
            const patchResponse = await fetch(`http://127.0.0.1:3333/logs/${alertEnviado_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    alertEnviado_status: 'VISUALIZADO', 
                    alertEnviado_usuario_retorno: id_usuario,
                }),
            });

            if (!patchResponse.ok) {
                throw new Error('Erro ao atualizar notificação');
            }

            console.log(`Notificação ${alertEnviado_id} atualizada com sucesso`);

            // Após atualizar a notificação, atualize a lista de notificações
            await fetchData();

            alert('Notificação visualizada com sucesso');
        } catch (error) {
            console.error(`Erro ao atualizar notificação ${alertEnviado_id}:`, error);
            alert('Erro ao atualizar notificação');
        }
    };

    // Função para formatar data no formato brasileiro
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

    // Fetch de dados com useEffect
    useEffect(() => {
        fetchData(); // Busque os dados ao montar o componente ou quando `equipamentoId` mudar
    }, [equipamentoId, reloadKey]); // Adiciona `equipamentoId` como dependência

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            {/* Usando map para iterar sobre a lista de notificações */}
            {statusEquipamento.map((item) => (
                <Pressable
                    key={item.equip_id} // Adicionando uma chave única    
                    style={styles.campoStatus}                
                    onPress={() => usuarioVisualizou(item.alertEnviado_id)}
                >
                    <View>
                        {/*nome da temperatura*/}
                        <Text style={styles.titulo}>{item.alerta_tipo}</Text>

                        {/* Exibindo o horário formatado */}
                        <Text>
                            Horário: {item.alertEnviado_data 
                                ? formatarDataHoraBrasileira(item.alertEnviado_data) 
                                : 'Carregando...'}
                        </Text>

                        <Text>
                            Temp. Registrada:  
                            <Text style={{ fontWeight: 'bold', color: 'red', marginLeft:10 }}>
                                {item.dados_temp} °C
                            </Text>
                        </Text>
                    </View>
                </Pressable>
            ))}
        </View>
    );
}
