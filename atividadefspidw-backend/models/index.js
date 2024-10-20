// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');  // Certifique-se de que o caminho esteja correto

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar e inicializar os modelos
db.Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);
db.Membro = require('./Membro')(sequelize, Sequelize.DataTypes);

module.exports = db;
