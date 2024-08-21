import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Picker, TextInput } from 'react-native';

import styles from './styles';

export default function Configuracao() {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
  
    const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);
    const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);



    return (
    <View style={styles.container}>
      <Text style={styles.header}>Configurações</Text>

    <View style={styles.setting}>
        <Text style={styles.label}>Modo Escuro</Text>
        <Switch
            onValueChange={toggleDarkMode}
            value={isDarkMode}
        />
    </View>

    <View style={styles.setting}>
        <Text style={styles.label}>Notificações</Text>
        <Switch
            onValueChange={toggleNotifications}
            value={isNotificationsEnabled}
        />
    </View>

    <View style={styles.setting}>
        <Text style={styles.label}>Idioma</Text>
        <Picker
            selectedValue={selectedLanguage}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        >
            <Picker.Item label="Português" value="pt" />
            <Picker.Item label="Inglês" value="en" />
            <Picker.Item label="Espanhol" value="es" />
        </Picker>
    </View>






      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
    );
};