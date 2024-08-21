import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import styles from './styles';

export default function Sobre() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: '../assets/logo.png' }} // Exemplo de logotipo
                    style={styles.logo}
                />
                <Text style={styles.title}>ColdBox</Text>
                <Text style={styles.version}>Versão 1.0.0</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Sobre o aplicativo</Text>
                <Text style={styles.description}>
                    O sistema ColdBox é uma solução tecnológica projetada para supervisionar e controlar as condições ambientais dentro de câmaras frias utilizadas para armazenar produtos sensíveis à temperatura, como alimentos, medicamentos, e outros itens perecíveis.
                    Este sistema geralmente integra sensores de temperatura, umidade e outros parâmetros críticos para garantir que os níveis estejam dentro das faixas ideais. 
                </Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Desenvolvido por ColdBox</Text>
                <Text style={styles.footerText}>©2024 ColdBox</Text>
            </View>
        </ScrollView>
    );
};