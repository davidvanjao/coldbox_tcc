import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Certifique-se de ajustar o caminho conforme a estrutura do seu projeto
//import Login from './src/Login';
//import Home from './src/home';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Login/> */}
      {/* <Home/> */}
      <Text style={styles.title}>Bem vindo</Text>      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
