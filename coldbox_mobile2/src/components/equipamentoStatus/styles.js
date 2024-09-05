import { StyleSheet } from 'react-native';

//exporta estilizacao
export default styles = StyleSheet.create({
    titulo: {
      fontSize:15,
      fontWeight: 'bold',  
      marginBottom:10
    },

    textoSimples: {
      fontWeight: 'bold',
      fontSize:15
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
