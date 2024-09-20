import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import styles from './styles';

export default function Equipamento({id_usuario, id_cliente}) {

    console.log(id_usuario);

    const [equipamentos, setEquipamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3333/equipamento/${id_cliente}`, {
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
            {equipamentos.map((item) => (
                <Pressable
                    key={item.equip_id} // Adicionando uma chave única
                    style={styles.equipamento}
                    onPress={() => props.navigation.navigate('InfoEquipamento', { equipamentoId: item.equip_id })}
                >
                    <View style={styles.equipamentoInfo}>
                        <Text>Equip: {item.equip_nome}</Text> {/* Exibindo o nome do equipamento */}
                        <Text>Local: {item.loc_razaoSocial}</Text> {/* Exibindo o local */}
                        <Text>Ult. Comunicação: {item.dados_data}</Text> {/* Exibindo a última comunicação */}
                    </View>
                    <View style={styles.equipamentoStatus}>
                        <Text style={styles.textoSimples}>5</Text> {/* Exibindo notificacoes */}
                    </View>
                </Pressable>
            ))}
        </View>
    );
}
