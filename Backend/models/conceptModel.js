// backend/models/conceptModel.js

const mongoose = require('mongoose');

const ConceptSchema = new mongoose.Schema({
  aluno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  disciplina_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  conceito: { type: Number, required: true }
});

const Concept = mongoose.model('Concept', ConceptSchema);

module.exports = Concept;
