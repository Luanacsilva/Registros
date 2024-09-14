// backend/models/classModel.js

const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  ano: { type: Number, required: true },
  semestre: { type: Number, required: true }
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;
