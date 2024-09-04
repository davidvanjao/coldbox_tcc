import {StyleSheet } from 'react-native';

//exporta estilizacao
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
      },
      header: {
        alignItems: 'center',
        marginBottom: 20,
      },
      logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      version: {
        fontSize: 14,
        color: '#888',
      },
      content: {
        marginBottom: 30,
      },
      subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        textAlign:'justify'
      },
      footer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,
        alignItems: 'center',
      },
      footerText: {
        fontSize: 14,
        color: '#666',
      },
}); 