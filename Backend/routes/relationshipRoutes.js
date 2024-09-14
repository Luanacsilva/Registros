// backend/routes/relationshipRoutes.js

const express = require('express');
const router = express.Router();
const relationshipController = require('../controllers/relationshipController');

// Rota para Vincular Professor a Disciplina
router.post('/teacher-subject', relationshipController.linkTeacherToSubject);

// Rota para Vincular Aluno a Turma
router.post('/student-class', relationshipController.linkStudentToClass);

module.exports = router;
