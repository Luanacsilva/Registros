// backend/models/subjectModel.js

const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String }
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;
