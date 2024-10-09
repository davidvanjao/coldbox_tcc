import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Equipamento({ id_usuario, id_cliente }) {
    const navigation = useNavigation(); // Objeto de navegação
    const [equipamentos, setEquipamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dadosAdicionais, setDadosAdicionais] = useState({}); // Estado combinado para dados adicionais e notificações

    // Função para formatar data e hora no formato brasileiro
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

    // Função para buscar equipamentos e dados adicionais
    useEffect(() => {
        const fetchEquipamentos = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3333/equipamento/dadosEquipamentoEmpresa/${id_cliente}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar equipamentos');
                }

                const data = await response.json();
                setEquipamentos(data.dados); // Define os equipamentos
                setLoading(false); // Encerra o carregamento

                // Busca dados adicionais e notificações paralelamente
                const extraDataPromises = data.dados.map(async (equipamento) => {
                    const [extraDataResponse, notificacaoResponse] = await Promise.all([
                        fetch(`http://127.0.0.1:3333/equipamento/dadosUltimaComunicacao/${equipamento.equip_id}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        }),
                        fetch(`http://127.0.0.1:3333/logs/listarNotificacoesTotalEmAberto/${equipamento.equip_id}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        }),
                    ]);

                    const extraData = await extraDataResponse.json();
                    const notificacaoData = await notificacaoResponse.json();

                    return {
                        equip_id: equipamento.equip_id,
                        horario: extraData.dados[0]?.dados_data,
                        totalNotificacao: notificacaoData.dados[0]?.notificacao || 0,
                    };
                });

                const allExtraData = await Promise.all(extraDataPromises);
                
                // Armazena os dados adicionais no estado
                const dadosAdicionaisMap = allExtraData.reduce((acc, curr) => {
                    acc[curr.equip_id] = curr;
                    return acc;
                }, {});

                setDadosAdicionais(dadosAdicionaisMap);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            }
        };

        fetchEquipamentos();

        // Atualiza os dados a cada 10 segundos
        const intervalId = setInterval(fetchEquipamentos, 10000);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(intervalId);

    }, [id_cliente]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            {/* Mapeando e exibindo os equipamentos */}
            {equipamentos.map((item) => (
                <Pressable
                    key={item.equip_id} // Chave única para cada equipamento
                    style={styles.equipamento}
                    onPress={() => navigation.navigate('InfoEquipamento', { 
                        equipamentoId: item.equip_id, 
                        id_usuario, 
                        id_cliente 
                    })}
                >
                    <View style={styles.equipamentoInfo}>
                        <Text>Local: {item.local_nome}</Text>
                        <Text>{item.local_descricao}</Text>
                        <Text>Id: {item.equip_id}</Text>

                        {/* Exibe o horário formatado ou carregando */}
                        <Text>Horário: {dadosAdicionais[item.equip_id]?.horario 
                            ? formatarDataHoraBrasileira(dadosAdicionais[item.equip_id].horario) 
                            : 'Carregando...'}</Text>
                    </View>
                    <View style={styles.equipamentoStatus}>
                        <Text style={styles.textoSimples}>
                            {dadosAdicionais[item.equip_id]?.totalNotificacao || '0'}
                        </Text>
                    </View>
                </Pressable>
            ))}
        </View>
    );
}
