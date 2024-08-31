import { View, Text, Pressable} from 'react-native';

import styles from './styles';

export default function Home(props) {

    return (
        <View style={styles.container}>
            
            <Text style={styles.titulo}>Seja bem vindo David!</Text>               
            <Text style={styles.textoSimples}>Equipamentos disponiveis:</Text>            

            <Pressable style={styles.equipamento} 
                onPress={() => props.navigation.navigate('Equipamento')}
            >
                <View style={styles.equipamentoInfo}>
                    <Text>Equip: Camera Fria 1</Text>
                    <Text>Local: Supermercado Gaspar</Text>
                    <Text>Ult. Comunicação: 27/08/2024 22:26</Text>
                </View>
                <View style={styles.equipamentoStatus}>
                    <Text style={styles.textoSimples}>5</Text>
                </View>
            </Pressable>      

        </View>
    );
};