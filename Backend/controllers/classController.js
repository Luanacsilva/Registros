// backend/controllers/classController.js

const Class = require('../models/classModel');

// Criar uma Nova Turma
exports.createClass = async (req, res) => {
  const { nome, ano, semestre } = req.body;

  try {
    const newClass = new Class({ nome, ano, semestre });
    await newClass.save();
    res.status(201).json({ message: 'Turma criada com sucesso', newClass });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar turma', error: err.message });
  }
};

// Listar Todas as Turmas
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar turmas', error: err.message });
  }
};

// Atualizar uma Turma
exports.updateClass = async (req, res) => {
  const { id } = req.params;
  const { nome, ano, semestre } = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(id, { nome, ano, semestre }, { new: true });
    if (!updatedClass) return res.status(404).json({ message: 'Turma não encontrada' });
    res.json({ message: 'Turma atualizada com sucesso', updatedClass });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar turma', error: err.message });
  }
};

// Deletar uma Turma
exports.deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) return res.status(404).json({ message: 'Turma não encontrada' });
    res.json({ message: 'Turma deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar turma', error: err.message });
  }
};
