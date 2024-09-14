// backend/controllers/subjectController.js

const Subject = require('../models/subjectModel');

// Criar uma Nova Disciplina
exports.createSubject = async (req, res) => {
  const { nome, descricao } = req.body;

  try {
    const newSubject = new Subject({ nome, descricao });
    await newSubject.save();
    res.status(201).json({ message: 'Disciplina criada com sucesso', newSubject });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar disciplina', error: err.message });
  }
};

// Listar Todas as Disciplinas
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar disciplinas', error: err.message });
  }
};

exports.getSubjectsDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findById(id);
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar disciplinas', error: err.message });
  }
};

// Atualizar uma Disciplina
exports.updateSubject = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  try {
    const updatedSubject = await Subject.findByIdAndUpdate(id, { nome, descricao }, { new: true });
    if (!updatedSubject) return res.status(404).json({ message: 'Disciplina não encontrada' });
    res.json({ message: 'Disciplina atualizada com sucesso', updatedSubject });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar disciplina', error: err.message });
  }
};

// Deletar uma Disciplina
exports.deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubject = await Subject.findByIdAndDelete(id);
    if (!deletedSubject) return res.status(404).json({ message: 'Disciplina não encontrada' });
    res.json({ message: 'Disciplina deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar disciplina', error: err.message });
  }
};
