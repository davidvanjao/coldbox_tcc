import { View, Text, Pressable, TextInput, Image} from 'react-native';

import styles from './styles';

export default function Login() {

    return (
        <View style={styles.container}>            
            <View style={styles.containerHeader}>
                <Text style={styles.message}>Bem-vindo!!</Text>
            </View>

            <View style={styles.containerForm}>

                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite seu email..."
                    style={styles.input}
                    autoCapitalize="none"
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </Pressable>

                <Pressable style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </Pressable>

                <View style={styles.campoImagem}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                        uri: './assets/logo.png',
                        }}
                    />
                </View>

            </View>




        </View>
    );
};