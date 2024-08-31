import { Button, StyleSheet } from 'react-native';

//exporta estilizacao
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding:10

    },

    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        padding:20,
        textAlign:'center'
    },

    textoSimples: {
        fontWeight: 'bold',
        fontSize:15
    },

    equipamento: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        
        backgroundColor: '#CCCCFF',
        borderRadius:10,
        padding:10,

        marginTop:10,
        marginBottom:10
    },

    equipamentoStatus: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',

        width: 50,
        height: 50,
        borderRadius:10,
        borderWidth: 2,

    },
}); 
