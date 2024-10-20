// app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Conexão com o banco de dados
const usuarioRoutes = require('./routes/usuarioRoutes'); // Rotas de usuários

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Usar as rotas
app.use('/api', usuarioRoutes);  // Prefixo /api para as rotas

// Sincronizar com o banco de dados
sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados sincronizado.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
