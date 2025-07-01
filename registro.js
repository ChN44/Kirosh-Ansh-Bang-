
// Salva o usuário e senha no localStorage ao registrar
document.querySelector('.registro-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const senha = document.getElementById('senha').value;

  if (!nome || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

  // Recupera os usuários já cadastrados
  let usuarios = {};
  try {
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  } catch {
    usuarios = {};
  }

  // Verifica se o usuário já existe
  if (usuarios[nome]) {
    alert('Usuário já existe! Escolha outro nome.');
    return;
  }

  // Adiciona o novo usuário
  usuarios[nome] = senha;
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Registro realizado com sucesso! Agora faça login.');
  window.location.href = 'home.html';
});