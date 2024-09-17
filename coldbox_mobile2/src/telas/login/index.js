import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Image} from 'react-native';

import { useNavigation } from '@react-navigation/native'; //usando para navegacao
import AsyncStorage from '@react-native-async-storage/async-storage'; //usado para gerar token

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
            const token = data.dados[0].user_id;//token criado é o mesmo do id do usuario logado.
            const user_id = data.dados[0].user_id;
            
            //Armazena o token no AsyncStorage
            await AsyncStorage.setItem('userToken', token);

            // Exemplo de envio de parâmetros ao navegar para a tela 'Home'
            navigation.navigate('Home', {
                user_id: user_id,  // Parâmetro enviado
                token: token,      // Outro parâmetro enviado
            });

            console.log('Navegando para Home com user_id:', user_id, 'e token:', token);

            
        } catch(error) {
            alert('Erro Credenciais inválidas');
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

                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </Pressable>

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