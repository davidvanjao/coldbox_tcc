import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, alert} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

export default function Login() {  
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        //Verifica se já existe um token armazenado ao carregar o componente
        const checkSession = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                // Se houver um token, navegue diretamente para a tela principal
                navigation.navigate('Home');
            }
        };
        checkSession();
    }, []);
    
    const handleLogin = async () => {
        
        if(email === '' || password === ''){
            alert('Erro Por favor, preencha todos os campos.');
            return;
        }

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
                throw new Error('Erro ao fazer login');
            }
    
            const data = await response.json();
            //Aqui você pode adicionar a lógica para salvar o token de autenticação e navegar para outra tela
            //alert(`Sucesso Bem-vindo, ${email}!`);
            const token = data.token;

            //Armazena o token no AsyncStorage
            await AsyncStorage.setItem('userToken', token);

            //Navega para a tela principal
            navigation.navigate('Home');
            
        } catch(error) {
            alert('Erro Credenciais inválidas');
        }
    
    };

    const handleLogout = async () => {
        // Remove o token ao fazer logout
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('LoginScreen');
    };

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-vindo!!</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>

                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite seu email..."
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
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

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
};