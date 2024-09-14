// backend/controllers/authController.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configurar uma chave secreta para o JWT
const SECRET_KEY = 'sua_chave_secreta';

// Função de Login
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    // Comparar senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    // Gerar token JWT
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
      token,
      user_id: user._id,
      user_role: user.tipo_usuario
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};
// Função de Solicitação de Redefinição de Senha
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  // Lógica para gerar um token e enviar e-mail com link de redefinição
};

// Função de Redefinição de Senha
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  // Lógica para validar o token e atualizar a senha
};

// Função de Solicitação de Redefinição de Senha
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  // Código para verificar o usuário e enviar token por e-mail...
};

// Função de Redefinição de Senha
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  // Código para validar o token e atualizar a senha...
};

// Configuração do nodemailer para envio de emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu-email@gmail.com',
    pass: 'sua-senha-de-app' // Use uma senha de app gerada
  }
});

// Função de Solicitação de Redefinição de Senha
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const token = crypto.randomBytes(20).toString('hex'); // Gera token seguro
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora de validade

    await user.save();

    const mailOptions = {
      to: user.email,
      from: 'seu-email@gmail.com',
      subject: 'Recuperação de Senha',
      text: `Você está recebendo este e-mail porque uma solicitação de recuperação de senha foi feita para sua conta.\n\n` +
        `Clique no link a seguir ou cole-o em seu navegador para completar o processo:\n\n` +
        `http://localhost:3000/reset/${token}\n\n` +
        `Se você não solicitou esta ação, por favor, ignore este e-mail.\n`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email de recuperação de senha enviado!' });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar email', error: error.message });
  }
};

// Função de Redefinição de Senha
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Token inválido ou expirado' });

    user.senha = newPassword; // Atualiza a senha
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: 'Senha redefinida com sucesso' });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao redefinir senha', error: error.message });
  }
};
