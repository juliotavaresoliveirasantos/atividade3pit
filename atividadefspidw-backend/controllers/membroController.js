const db = require('../models');


// Listar todos os membros
exports.listarMembros = async (req, res) => {
  try {
    const membros = await db.Membro.findAll();
    res.json(membros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os membros' });
  }
};


// Obter membro por ID
exports.obterMembroPorId = async (req, res) => {
  try {
    const membro = await db.Membro.findByPk(req.params.id);
    if (membro) {
      res.json(membro);
    } else {
      res.status(404).json({ error: 'Membro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o membro' });
  }
};


// Adicionar novo membro
exports.adicionarMembro = async (req, res) => {
  try {
    const novoMembro = await db.Membro.create(req.body);
    res.status(201).json(novoMembro);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar o membro' });
  }
};


// Atualizar membro
exports.atualizarMembro = async (req, res) => {
  try {
    const membro = await db.Membro.findByPk(req.params.id);
    if (membro) {
      await membro.update(req.body);
      res.json(membro);
    } else {
      res.status(404).json({ error: 'Membro não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar o membro' });
  }
};


// Deletar membro
exports.deletarMembro = async (req, res) => {
  try {
    const membro = await db.Membro.findByPk(req.params.id);
    if (membro) {
      await membro.destroy();
      res.json({ message: 'Membro deletado' });
    } else {
      res.status(404).json({ error: 'Membro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o membro' });
  }
};
