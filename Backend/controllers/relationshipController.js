// backend/controllers/relationshipController.js

const TeacherSubject = require('../models/teacherSubjectModel');
const StudentClass = require('../models/studentClassModel');

// Vincular Professor a Disciplina
exports.linkTeacherToSubject = async (req, res) => {
  const { professor_id, disciplina_id } = req.body;

  try {
    const newLink = new TeacherSubject({ professor_id, disciplina_id });
    await newLink.save();
    res.status(201).json({ message: 'Professor vinculado à disciplina com sucesso', newLink });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao vincular professor à disciplina', error: err.message });
  }
};

// Vincular Aluno a Turma
exports.linkStudentToClass = async (req, res) => {
  const { aluno_id, turma_id } = req.body;

  try {
    const newLink = new StudentClass({ aluno_id, turma_id });
    await newLink.save();
    res.status(201).json({ message: 'Aluno vinculado à turma com sucesso', newLink });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao vincular aluno à turma', error: err.message });
  }
};
