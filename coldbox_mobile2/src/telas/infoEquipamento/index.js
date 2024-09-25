import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Importa o useRoute

import styles from './styles';

import EquipamentoStatus from '../../components/equipamentoStatus';
import Grafico from '../../components/graficos';

export default function InfoEquipamento(props) {

    const route = useRoute(); // Usa o useRoute para acessar os parâmetros
    const { equipamentoId } = route.params; // Extrai o parâmetro passado (equipamentoId)

    return (           
        <View style={styles.container}>
            <EquipamentoStatus equipamentoId={equipamentoId} />
        </View>
    );
};