// backend/routes/subjectRoutes.js

const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Rota para Criar uma Nova Disciplina
router.post('/', authenticate, authorize(['coordenador', 'professor']), subjectController.createSubject);

// Rota para Listar Todas as Disciplinas
router.get('/', authenticate, subjectController.getAllSubjects);
router.get('/:id', authenticate, subjectController.getSubjectsDetails);

// Rota para Atualizar uma Disciplina
router.put('/:id', authenticate, authorize(['coordenador', 'professor']), subjectController.updateSubject);

// Rota para Deletar uma Disciplina
router.delete('/:id', authenticate, authorize(['coordenador', 'professor']), subjectController.deleteSubject);

module.exports = router;
