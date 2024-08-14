import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Login() {  
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
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
            // Aqui você pode adicionar a lógica para salvar o token de autenticação e navegar para outra tela
            alert(`Sucesso Bem-vindo, ${email}!`);

            navigation.navigate('Inicio');
            
        } catch(error) {
            alert('Erro Credenciais inválidas');
        }
    
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