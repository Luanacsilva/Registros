// backend/models/studentClassModel.js

const mongoose = require('mongoose');

const StudentClassSchema = new mongoose.Schema({
  aluno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  turma_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }
});

const StudentClass = mongoose.model('StudentClass', StudentClassSchema);

module.exports = StudentClass;
