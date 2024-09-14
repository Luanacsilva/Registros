// backend/models/classSubjectModel.js

const mongoose = require('mongoose');

const ClassSubjectSchema = new mongoose.Schema({
  turma_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  disciplina_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }
});

const ClassSubject = mongoose.model('ClassSubject', ClassSubjectSchema);

module.exports = ClassSubject;
