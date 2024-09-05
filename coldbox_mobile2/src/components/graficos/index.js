import { View, Text} from 'react-native';

import styles from './styles';

export default function Grafico() {

    return (        
        <View>
            <Text style={styles.titulo}>Equipamento A</Text>
            <View style={styles.grafico}>
            </View>
        </View>        
    );
};