import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; //usando para navegacao
import AsyncStorage from '@react-native-async-storage/async-storage'; //usado para gerar token

import styles from './styles';

export default function Login() {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Adiciona estado de carregamento

    // Verifica se já existe um token armazenado ao carregar o componente
    useEffect(() => {
        const checkSession = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    navigation.navigate('Home'); // Se houver token, navegue para Home
                }
            } catch (error) {
                console.error('Erro ao recuperar token:', error);
            }
        };
        checkSession();
    }, [navigation]);

    // Função para validar o formato do e-mail
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {

        if (!validateEmail(email)) {
            alert('Erro: Por favor, insira um e-mail válido.');
            return;
        }

        if (password.length < 3) {
            alert('Erro: A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setLoading(true); // Ativa o carregamento


        try {
            const response = await fetch('http://localhost:3333/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_email: email,
                    user_senha: password,
                }),
            });  
    
            if(!response.ok) {
                throw new Error('Erro ao fazer login. Verifique suas credenciais.');
            }
    
            const data = await response.json();
            const token = data.dados[0].user_id;//token criado é o mesmo do id do usuario logado.
            const user_id = data.dados[0].user_id;
            
            //Armazena o token no AsyncStorage
            await AsyncStorage.setItem('userToken', token);

            // Envia parâmetros ao navegar para a tela Home
            navigation.navigate('Home', {
                info: { user_id, token }
            });

            console.log('Navegando para Home com user_id:', user_id, 'e token:', token);
            
        } catch (error) {
            alert('Erro: Credenciais inválidas.');
        } finally {
            setLoading(false); // Desativa o carregamento
        }
    
    };
    

    return (
        <View style={styles.container}>            
            <View style={styles.containerHeader}>
                <Text style={styles.message}>Bem-vindo!!</Text>
            </View>

            <View style={styles.containerForm}>

                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite seu email..."
                    style={styles.input}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address" // Define o teclado apropriado para e-mails
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />

                {/* Mostra um ActivityIndicator se estiver carregando */}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Pressable style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Acessar</Text>
                    </Pressable>
                )}

                <View style={styles.campoImagem}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                        uri: './assets/logo.png',
                        }}
                    />
                </View>
            </View>
        </View>
    );
};