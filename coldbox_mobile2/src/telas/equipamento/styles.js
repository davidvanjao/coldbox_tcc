import {StyleSheet } from 'react-native';

//exporta estilizacao
export default styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    titulo: {
      fontSize:15,
      fontWeight: 'bold',  
      marginBottom:10
    },

    textoSimples: {
      fontWeight: 'bold',
      fontSize:15
    },


    grafico: {
      width: '100%',
      height: 300,
      borderWidth: 2,
    },

    status: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
      
      backgroundColor: 'yellow',
      borderRadius:10,
      padding:10,

      marginTop:10,
      marginBottom:10
    }
      
}); 