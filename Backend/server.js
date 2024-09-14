const express = require('express');
const http = require('http'); // Importa http para usar com Socket.IO
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const winston = require('./utils/logger'); // Importa o logger personalizado
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Sentry = require('@sentry/node'); // Importação do Sentry para monitoramento de erros

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const relationshipRoutes = require('./routes/relationshipRoutes');
const conceptRoutes = require('./routes/conceptRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app); // Cria o servidor HTTP com express
const io = socketIo(server); // Configura o Socket.IO com o servidor

// Configuração do Sentry para monitoramento de erros
// Sentry.init({ dsn: 'SUA_DSN_AQUI' });
// app.use(Sentry.Handlers.requestHandler());

// Conexão com o MongoDB

mongoose.connect('mongodb://luana:secret@127.0.0.1:27017/admin', {
  user: "luana",
  pass: "secret",
  dbName: "Presenca"

})
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: winston.stream })); // Configuração do Morgan para usar Winston

// Configuração do Swagger para documentação da API
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API do Projeto Integrador',
      description: 'Documentação da API do projeto integrador',
      contact: {
        name: 'Seu Nome'
      },
      servers: ['http://localhost:3000']
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Definir Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/relationships', relationshipRoutes);
app.use('/api/concepts', conceptRoutes);

// Lógica do Socket.IO para notificações
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  // Notificação para novos registros
  socket.on('new-user', (user) => {
    io.emit('notification', `Novo usuário registrado: ${user.nome}`);
  });
});

// Iniciar o Servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// Exemplo de notificação para novas turmas
app.post('/api/classes', async (req, res) => {
  try {
    // Código para criar uma nova turma...
    const newClass = await createClass(req.body); // Supondo que createClass seja uma função para criar a turma

    // Emite notificação de nova turma para todos os clientes conectados
    io.emit('new-class', `Nova turma criada: ${newClass.nome}`);

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar turma', error: error.message });
  }
});
// Lógica de notificação para novas turmas
app.post('/api/classes', async (req, res) => {
  try {
    const newClass = await Class.create(req.body); // Criação da turma

    // Notificação de nova turma para todos os clientes conectados
    io.emit('new-class', `Nova turma criada: ${newClass.nome}`);

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar turma', error: error.message });
  }
});
// Lógica de notificação para novas notas
app.post('/api/concepts', async (req, res) => {
  try {
    const newConcept = await Concept.create(req.body); // Criação de conceito (nota)

    // Notificação de nova nota para o aluno específico
    io.to(req.body.aluno_id).emit('new-grade', `Nova nota atribuída: ${newConcept.conceito}`);

    res.status(201).json(newConcept);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar nota', error: error.message });
  }
});

