const express = require('express');
const router = express.Router();
const membroController = require('../controllers/membroController');


router.get('/membro', membroController.listarMembros);
router.get('/membro/:id', membroController.obterMembroPorId);
router.post('/membro', membroController.adicionarMembro);
router.put('/membro/:id', membroController.atualizarMembro);
router.delete('/membro/:id', membroController.deletarMembro);


module.exports = router;