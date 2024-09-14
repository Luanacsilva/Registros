// backend/controllers/conceptController.js

const Concept = require('../models/conceptModel');

// Registrar Nota de Aluno
exports.registerConcept = async (req, res) => {
  const { aluno_id, disciplina_id, conceito } = req.body;

  try {
    const newConcept = new Concept({ aluno_id, disciplina_id, conceito });
    await newConcept.save();
    res.status(201).json({ message: 'Nota registrada com sucesso', newConcept });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar nota', error: err.message });
  }
};

// Listar Notas de Aluno
exports.getConceptsByStudent = async (req, res) => {
  const { aluno_id } = req.params;

  try {
    const concepts = await Concept.find({ aluno_id });
    res.json(concepts);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar notas', error: err.message });
  }
};
