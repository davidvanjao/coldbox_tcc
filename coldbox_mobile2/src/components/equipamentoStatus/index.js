import { View, Text, Pressable} from 'react-native';
import { useRoute } from '@react-navigation/native'; // Importa o useRoute

import styles from './styles';

export default function EquipamentoStatus() {

    const route = useRoute(); // Usa o useRoute para acessar os parâmetros
    const { equipamentoId } = route.params; // Extrai o parâmetro passado (equipamentoId)

    const [equipamentosStatus, setEquipamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3333/equipamento', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }

                const data = await response.json();
                // Verifique se a resposta está sendo recebida corretamente
                //console.log(data);  // Certifique-se de ver os dados da API aqui
                setEquipamentos(data.dados); // Acessa o array "dados" dentro da resposta da API
                setLoading(false);

            } catch (error) {
                alert('Erro ao buscar os dados');
                setLoading(false);
            }
        };

        fetchData();

        //Configura o intervalo para atualizar os dados a cada X milissegundos
        const intervalId = setInterval(() => {
            fetchData();
        }, 10000); // Atualiza a cada 10 segundos (10.000 ms)

        //Limpa o intervalo ao desmontar o componente
        return () => clearInterval(intervalId);

    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }












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