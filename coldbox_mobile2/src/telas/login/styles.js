import {StyleSheet } from 'react-native';

//exporta estilizacao
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#000'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },   
    containerForm: {
        backgroundColor: '#2C4CBF',
        flex:1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        marginTop: 28,
        marginBottom:10,
        color: '#fff'
    },
    input: {
        borderBottomWidth: 1,
        padding:20,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color:'#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    campoImagem: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 200,
        height: 200,
    }
}); 
