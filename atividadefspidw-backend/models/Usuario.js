// models/Usuario.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nivel_acesso: {
      type: DataTypes.ENUM('administrador', 'funcionario'),
      allowNull: false
    }
  });

  return Usuario;
};
