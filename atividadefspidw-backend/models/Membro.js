// models/Membro.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Membro = sequelize.define('Membro', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true // Restrições para garantir que o CPF seja único
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  return Membro;
};
