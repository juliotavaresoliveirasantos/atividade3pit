// controllers/usuarioController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

// Função de registro de usuário
const registrarUsuario = async (req, res) => {
  const { nome, email, senha, nivel_acesso } = req.body;

  try {
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Usuário já cadastrado com esse email.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await db.Usuario.create({
      nome,
      email,
      senha: senhaHash,
      nivel_acesso,
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar o usuário.' });
  }
};

// Função de login
const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await db.Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: usuario.id, nivel_acesso: usuario.nivel_acesso }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.json({ token, usuario: { nome: usuario.nome, nivel_acesso: usuario.nivel_acesso } });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

// Função de trocar senha
const trocarSenha = async (req, res) => {
  const { senhaAtual, novaSenha } = req.body;
  try {
    const usuario = await db.Usuario.findByPk(req.userId); // `req.userId` deve vir do token decodificado

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha atual incorreta.' });
    }

    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
    await usuario.update({ senha: novaSenhaHash });

    res.json({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    console.error('Erro ao trocar a senha:', error);
    res.status(500).json({ error: 'Erro ao trocar a senha.' });
  }
};

// Exporta as funções
module.exports = {
  registrarUsuario,
  login,
  trocarSenha,
};
