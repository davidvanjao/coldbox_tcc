import { View, Text} from 'react-native';
import Equipamento from '../../components/equipamento';

import styles from './styles';

export default function Home({route}) {    

    const { user_id, token } = route.params || {};  // Acessa os parâmetros enviados
    
    return (
        <View style={styles.container}>                      
            <Text style={styles.textoSimples}>Equipamentos disponiveis: {user_id}</Text>
            <Equipamento {...route}/>  
        </View>
    );
};
