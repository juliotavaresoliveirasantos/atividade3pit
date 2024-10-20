const { Sequelize } = require('sequelize');


// Configuração da conexão com o banco de dados MySQL
const sequelize = new Sequelize('igreja', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false  // Para desabilitar logs SQL no console
});


module.exports = sequelize;
