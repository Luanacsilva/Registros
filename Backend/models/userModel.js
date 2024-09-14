// backend/models/userModel.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo_usuario: { type: String, enum: ['aluno', 'professor', 'coordenador'], required: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
