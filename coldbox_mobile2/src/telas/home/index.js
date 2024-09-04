import { View, Text} from 'react-native';
import Equipamento from '../../components/equipamento';

import styles from './styles';

export default function Home(props) {

    return (
        <View style={styles.container}>                      
            <Text style={styles.textoSimples}>Equipamentos disponiveis:</Text>
            <Equipamento {...props}/>  
        </View>
    );
};