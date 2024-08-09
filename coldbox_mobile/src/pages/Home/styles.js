import { Button, StyleSheet } from 'react-native';

//exporta estilizacao
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#38a69d',

        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    containerLogo: {
        flex:2,
        backgroundColor: '#38a69d',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd:'5%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12
    },
    text: {
        color: '#a1a1a1'
    },
    button: {
        position: 'absolute',
        backgroundColor: '#38a69d',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'

    }
}); 
