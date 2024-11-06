import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Equipamento from '../../components/equipamento';
import styles from './styles';

export default function Home({ navigation }) {

    const [token, setToken] = useState(null); // Estado para armazenar o token
    const [dadosUsuario, setDadosUsuario] = useState(null); // Estado para armazenar os dados do usuário
    const [loading, setLoading] = useState(true); // Estado para indicar carregamento
    const [error, setError] = useState(null); // Estado para gerenciar erros

    // Função para buscar o token do AsyncStorage
    const getToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (storedToken) {
                setToken(storedToken); // Atualiza o estado com o token
            } else {
                Alert.alert('Erro', 'Token de autenticação não encontrado. Faça login novamente.');
                navigation.navigate('Login'); // Navega para login se o token não for encontrado
            }
        } catch (error) {
            console.error('Erro ao recuperar o token:', error);
            setError('Erro ao recuperar o token. Tente novamente.');
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
                    setDadosUsuario(data.dados); // Acessa o array "dados" dentro da resposta da API
                    setLoading(false); // Conclui o carregamento

                } catch (error) {
                    console.error('Erro ao buscar os dados:', error);
                    setError('Erro ao buscar os dados do usuário.');
                    setLoading(false); // Conclui o carregamento, mesmo em caso de erro
                }
            };

            fetchData(); // Faz a requisição após o token ser recuperado
        }
    }, [token]); // Executa o useEffect quando o token for atualizado

    // Caso haja erro, exibe uma mensagem de erro
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }
    
    // Exibe um indicador de carregamento enquanto os dados são buscados
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Exibe os dados do usuário, caso estejam disponíveis */}
            {dadosUsuario[0] ? (
                <>
                    {/* <Text style={styles.textoSimples}>Usuário: {dadosUsuario[0].user_nome}</Text>
                    <Text style={styles.textoSimples}>Empresa: {dadosUsuario[0].cli_razaoSocial}</Text> */}
                    <Equipamento 
                        id_usuario={token} 
                        id_cliente={dadosUsuario[0].cli_id} 
                    />
                </>
            ) : (
                <Text style={styles.textoSimples}>Erro: Dados do usuário não encontrados.</Text>
            )}
        </View>
    );
};
