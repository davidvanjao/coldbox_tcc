import { View} from 'react-native';

import styles from './styles';

import EquipamentoStatus from '../../components/equipamentoStatus';
import Grafico from '../../components/graficos';

export default function InfoEquipamento() {

    return (           
        <View style={styles.container}>
            <Grafico/>
            <EquipamentoStatus/>
        </View>
    );
};