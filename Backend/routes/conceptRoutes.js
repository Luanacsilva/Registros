// backend/routes/conceptRoutes.js

const express = require('express');
const router = express.Router();
const conceptController = require('../controllers/conceptController');

// Rota para Registrar Nota de Aluno
router.post('/', conceptController.registerConcept);

// Rota para Listar Notas de Aluno
router.get('/:aluno_id', conceptController.getConceptsByStudent);

module.exports = router;
