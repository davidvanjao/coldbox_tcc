import { Button, StyleSheet } from 'react-native';

//exporta estilizacao
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
      },
      setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      label: {
        fontSize: 18,
      },
      picker: {
        height: 50,
        width: 150,
      },
      saveButton: {
        marginTop: 30,
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      saveButtonText: {
        color: '#fff',
        fontSize: 18,
      },

      
}); 
