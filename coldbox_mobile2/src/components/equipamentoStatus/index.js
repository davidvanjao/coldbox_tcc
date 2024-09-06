import { View, Text, Pressable} from 'react-native';

import styles from './styles';

export default function EquipamentoStatus() {

    return (

        <Pressable style={styles.status}>
            <View style={styles.statusInfo}>
                <Text>IDENTIFICADO ALTERAÇÃO NA TEMPERATURA</Text>
                <Text>27/08/2024 - 22:21</Text>
                <Text>TEMPERATURA: -6° Umidade: 10%</Text>
            </View>
        </Pressable>  
    );
};