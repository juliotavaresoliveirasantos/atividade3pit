// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarToken } = require('../middlewares/authMiddleware');  // Importar o middleware

// Rota para registrar um novo usuário
router.post('/registrar', usuarioController.registrarUsuario);

// Rota para login de usuário
router.post('/login', usuarioController.login);

// Rota para trocar senha (protegida por token)
router.put('/trocar-senha', verificarToken, usuarioController.trocarSenha);  // Middleware aplicado

module.exports = router;
