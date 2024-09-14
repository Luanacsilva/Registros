// backend/controllers/userController.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Registrar um novo usuário
exports.register = async (req, res) => {
  const { nome, email, senha, tipo_usuario } = req.body;
  
  try {
    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Usuário já existe' });

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = new User({ nome, email, senha: hashedPassword, tipo_usuario });

    // Salvar o usuário
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

// Atualizar um usuário
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { 
      nome: nome ?? undefined, 
      email: email ?? undefined, 
      senha: senha ? await bcrypt.hash(senha, 10) : undefined
    }, { 
      new: true 
    });

    if (!updatedUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json({ message: 'Usuário atualizado com sucesso', updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

// Deletar um usuário
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

// backend/controllers/userController.js

const { check, validationResult } = require('express-validator');

// Registrar um novo usuário com validação
exports.register = [
  check('email').isEmail().withMessage('Email inválido'),
  check('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha, tipo_usuario } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'Usuário já existe' });

      const hashedPassword = await bcrypt.hash(senha, 10);
      const newUser = new User({ nome, email, senha: hashedPassword, tipo_usuario });
      await newUser.save();
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro no servidor', error: err.message });
    }
  }
];
// backend/controllers/userController.js

// Listar todos os usuários com paginação
exports.getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Padrões: página 1, limite de 10

  try {
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments();
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar usuários', error: err.message });
  }
};
