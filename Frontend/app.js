// frontend/app.js

const api_url = "http://localhost:3000/api";

function logout() {
    console.log("deslogado");
    localStorage.clear();
    window.location.reload();
}

window.onload = () => {
    const menu_nav = document.getElementById("navigation");

    if (localStorage.getItem("token")) {
        const li = document.createElement('li');
        const button = document.createElement('button');

        button.type = 'button';
        button.onclick = () => logout();
        button.innerText = 'Sair';

        li.appendChild(button);
        menu_nav.appendChild(li);
    }
};


// Função para lidar com o Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-password').value;

    try {
        const response = await fetch(api_url + '/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login bem-sucedido!');
            // Armazene o token em localStorage ou cookies

            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('user_role', data.user_role);

            window.location.reload();
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

// Função para lidar com o Registro
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const senha = document.getElementById('register-password').value;
    const tipo_usuario = document.getElementById('register-role').value;

    try {
        const response = await fetch(api_url + '/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, tipo_usuario })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Usuário registrado com sucesso!');
            window.location.reload()
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

// Conexão com Socket.IO para notificações em tempo real
const socket = io();

// Escutar notificações de novas turmas
socket.on('new-class', (message) => {
    alert(message); // Exibir alerta de nova turma
});

// Escutar notificações de novas notas
socket.on('new-grade', (message) => {
    alert(message); // Exibir alerta de nova nota
});

// Função para solicitar redefinição de senha
async function forgotPassword(email) {
    try {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Erro ao solicitar redefinição de senha:', error);
    }
}

// Função para redefinir a senha
async function resetPassword(token, newPassword) {
    try {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
    }
}
// frontend/app.js

// Função para solicitar redefinição de senha
document.getElementById('forgot-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('forgot-password-email').value;

    try {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Erro ao solicitar redefinição de senha:', error);
    }
});

// Função para redefinir a senha
document.getElementById('reset-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = document.getElementById('reset-token').value;
    const newPassword = document.getElementById('reset-new-password').value;

    try {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
    }
});
// frontend/app.js

if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/service.worker.js')
        .then((registration) => {
            console.log('Service Worker registrado com sucesso:', registration);

            // Solicitar permissão para notificações
            Notification.requestPermission().then((result) => {
                if (result === 'granted') {
                    console.log('Permissão para notificações concedida');
                    // Aqui você pode configurar o push subscription se necessário
                }
            });
        })
        .catch((error) => {
            console.error('Falha ao registrar o Service Worker:', error);
        });
}
async function connectToUSB() {
    try {
      const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x1234 }] }); // Substitua pelo vendorId do seu dispositivo
      await device.open(); // Abra a conexão com o dispositivo
      await device.selectConfiguration(1); // Configure a comunicação com o dispositivo
      await device.claimInterface(0); // Reivindique a interface de comunicação
  
      console.log('Dispositivo USB conectado:', device);
      // Adicione código para enviar/receber dados do dispositivo aqui
  
    } catch (error) {
      console.error('Erro ao conectar ao dispositivo USB:', error);
    }
  }
  
  // Exemplo de uso ao clicar em um botão
  document.getElementById('connect-usb-button').addEventListener('click', connectToUSB);
  