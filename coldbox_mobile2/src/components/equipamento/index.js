import { View, Text, Pressable} from 'react-native';

import styles from './styles';

export default function Equipamento(props) {

    return (           
        <Pressable style={styles.equipamento} 
            onPress={() => props.navigation.navigate('Sobre')}//mudei para sobre

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
    );
};