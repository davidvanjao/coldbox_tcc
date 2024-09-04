import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; //usando para navegacao
import AsyncStorage from '@react-native-async-storage/async-storage'; //usado para gerar token

export default function Sair() {

    const navigation = useNavigation();

    const handleLogout = async () => {
        // Remove o token ao fazer logout
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
    };

    useEffect(() => {
        // Função que será executada ao carregar a página    
        handleLogout();
    }, []); // O array vazio [] garante que o efeito seja executado apenas uma vez ao montar o componente
   

};