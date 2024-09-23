import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import styles from './styles';

export default function Equipamento({id_usuario, id_cliente}) {
    
    const [equipamentos, setEquipamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [extraData, setExtraData] = useState({}); // Armazena dados adicionais por equipamento

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3333/equipamento/dadosEquipamentoEmpresa/${id_cliente}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }

                const data = await response.json();
                // Verifique se a resposta está sendo recebida corretamente
                //console.log(data);  // Certifique-se de ver os dados da API aqui
                setEquipamentos(data.dados); // Acessa o array "dados" dentro da resposta da API
                setLoading(false);

            } catch (error) {
                //alert('Erro ao buscar os dados');
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

    }, [id_cliente]);


    const fetchExtraData = async (equip_id) => {

        try {
            const response = await fetch(`http://127.0.0.1:3333/equipamento/dadosUltimaComunicacao/${equip_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro na requisição');
            }

            const data = await response.json();

            setExtraData(prevState => ({
                ...prevState,
                [equip_id]: {
                    ...data,
                    horario: data.dados_data
                }
            }));

        } catch (error) {
            console.error(`Erro ao buscar dados adicionais para o equipamento ${equip_id}:`, error);
        }
    };

    useEffect(() => {
        // Faz uma requisição para cada equipamento
        equipamentos.forEach(item => {
            fetchExtraData(item.equip_id);
        });
    }, [equipamentos]);


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }


    return (
        <View>
            {/* Usando map para iterar sobre a lista de equipamentos */}
            {equipamentos.map((item) => (
                <Pressable
                    key={item.equip_id} // Adicionando uma chave única
                    style={styles.equipamento}
                    onPress={() => props.navigation.navigate('InfoEquipamento', { equipamentoId: item.equip_id })}
                >
                    <View style={styles.equipamentoInfo}>
                        <Text>Local: {item.local_nome}</Text> {/* Exibindo o nome do equipamento */}
                        <Text>{item.local_descricao}</Text> {/* Exibindo o local */}
                        <Text>Id: {item.equip_id}</Text> {/* Exibindo o id do equipamento*/}


                        {/* Exibindo dados da segunda requisição */}
                        <Text>Extra Info: {extraData[item.equip_id]?.horario || 'Carregando...'}</Text>



                    </View>
                    <View style={styles.equipamentoStatus}>
                        <Text style={styles.textoSimples}>5</Text> {/* Exibindo notificacoes */}
                    </View>
                </Pressable>
            ))}
        </View>
    );
}
