import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Equipamento from '../../components/equipamento';
import styles from './styles';

export default function Home({ route }) {
    const [token, setToken] = useState(null); // Estado para armazenar o token
    const [dadosUsuario, setDadosUsuario] = useState([{
        "user_id": '',
        "user_nome": "",
        "cli_id": '',
        "cli_razaoSocial": ""
    }]); // Estado para armazenar os dados do usuário

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

    // Chama o fetchData apenas quando o token estiver disponível
    useEffect(() => {
        if (token) { // Verifica se o token não é null
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:3333/usuarios/dadosUsuarioEmpresa/${token}/`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Erro na requisição');
                    }

                    const data = await response.json();
                    //console.log('Dados do usuário:', data); // Verifica os dados recebidos
                    setDadosUsuario(data.dados); // Acessa o array "dados" dentro da resposta da API

                } catch (error) {
                    console.error('Erro ao buscar os dados:', error);
                    alert('Erro ao buscar os dados');
                }
            };

            fetchData(); // Faz a requisição após o token ser recuperado
        }
    }, [token]); // Executa o useEffect quando o token for atualizado

    return (
        <View style={styles.container}>
            <Text style={styles.textoSimples}>Usuário: {dadosUsuario[0].user_nome}</Text>
            <Text style={styles.textoSimples}>Empresa: {dadosUsuario[0].cli_razaoSocial}</Text>
            <Equipamento 
                //variaveis sendo passadas para equipamentos
                id_usuario={token} 
                id_cliente={dadosUsuario[0].cli_id} 
            />
        </View>
    );
};
