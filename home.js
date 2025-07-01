// ===============================
// Utilitário para seleção de elementos
// ===============================
function $(id) {
  return document.getElementById(id);
}

// ===============================
// Mostrar/Ocultar senha do login
// ===============================
(function () {
  const senhaInput = $('senha');
  const toggleSenha = $('toggleSenha');
  if (senhaInput && toggleSenha) {
    toggleSenha.addEventListener('click', function () {
      if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        toggleSenha.textContent = 'Ocultar';
        toggleSenha.setAttribute('aria-pressed', 'true');
      } else {
        senhaInput.type = 'password';
        toggleSenha.textContent = 'Mostrar';
        toggleSenha.setAttribute('aria-pressed', 'false');
      }
    });
    toggleSenha.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSenha.click();
      }
    });
  }
})();

// ===============================
// Funções para manipular usuários no localStorage
// ===============================

// Retorna objeto de usuários cadastrados
function getUsuarios() {
  try {
    return JSON.parse(localStorage.getItem('usuarios')) || {};
  } catch {
    return {};
  }
}

// Salva objeto de usuários no localStorage
function setUsuarios(users) {
  localStorage.setItem('usuarios', JSON.stringify(users));
}

// ===============================
// Login: Validação e redirecionamento
// ===============================
$('login-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const usuario = $('usuario').value.trim();
  const senha = $('senha').value;
  const erro = $('login-erro');
  const users = getUsuarios();

  if (
    (usuario === 'admin' && senha === '1234') ||
    (users[usuario] && users[usuario] === senha)
  ) {
    erro.style.display = 'none';
    localStorage.setItem('usuarioLogado', usuario); // Salva o usuário logado
    window.location.href = 'index.html'; // Redireciona para a página do usuário
  } else {
    erro.style.display = 'block';
    erro.textContent = 'Usuário ou senha incorretos.';
    $('senha').value = '';
    $('senha').focus();
  }
});