// backend/models/teacherSubjectModel.js

const mongoose = require('mongoose');

const TeacherSubjectSchema = new mongoose.Schema({
  professor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  disciplina_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }
});

const TeacherSubject = mongoose.model('TeacherSubject', TeacherSubjectSchema);

module.exports = TeacherSubject;
