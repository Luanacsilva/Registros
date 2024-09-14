// backend/routes/classRoutes.js

const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Rota para Criar uma Nova Turma
router.post('/', classController.createClass);

// Rota para Listar Todas as Turmas
router.get('/', classController.getAllClasses);

// Rota para Atualizar uma Turma
router.put('/:id', classController.updateClass);

// Rota para Deletar uma Turma
router.delete('/:id', classController.deleteClass);

module.exports = router;
