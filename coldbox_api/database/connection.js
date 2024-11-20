const mysql = require('mysql2/promise'); 

const bd_usuario = 'us_tecdes_223_g2'; // usuário
const bd_senha = 'ec0623'; // senha
const bd_servidor = '10.67.22.216'; // servidor
const bd_porta = '3306'; // porta
const bd_banco = 'bd_tcc_tecdes_223_g2'; // nome do banco
let connection;


// // // Configurações para usar em casa (Bruno/Henrique)
// const bd_usuario = 'root'; // usuário
// const bd_senha = 'ec0623'; // senha
// const bd_servidor = '127.0.0.1'; // servidor (localhost)
// const bd_porta = '3306'; // porta padrão MySQL
// const bd_banco = 'bd_tcc_tecdes_223_g2'; // nome do banco de dados
// let connection;

const config = {
    host: bd_servidor, 
    port: bd_porta, //Default: 3306
    user: bd_usuario, 
    password: bd_senha, 
    database: bd_banco, 
    waitForConnections : true, 
    connectionLimit : 10, //Default: 10 - deixar 100 ou 1000
    queueLimit : 0, 
}

    /* 
        -queueLimit-
        O número máximo de solicitações de conexão que o pool enfileirará 
        antes de retornar um erro do getConnection. Se definido como 0, não 
        há limite para o número de solicitações de conexão enfileiradas. (Padrão: 0)
    */

try {
    connection = mysql.createPool(config);

    console.log('Chamou conexão MySql!'); 
    
} catch (error) { 
    console.log(error); 
} 

connection.getConnection()
    .then(conn => {
        console.log("Conexão com o banco de dados bem-sucedida!");
        conn.release();
    })
    .catch(err => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });


module.exports = connection;