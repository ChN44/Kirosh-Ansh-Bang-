// Utilitário para selecionar elementos por id
function $(id) {
  return document.getElementById(id);
}

// Mostrar/ocultar senha do login
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

// Função para obter usuários do localStorage
function getUsuarios() {
  try {
    return JSON.parse(localStorage.getItem('usuarios')) || {};
  } catch {
    return {};
  }
}

// Função para salvar usuários no localStorage
function setUsuarios(users) {
  localStorage.setItem('usuarios', JSON.stringify(users));
}

// Função para obter dados de cada usuário
function getDadosUsuarios() {
  try {
    return JSON.parse(localStorage.getItem('dadosUsuarios')) || {};
  } catch {
    return {};
  }
}

// Função para salvar dados de cada usuário
function setDadosUsuarios(dados) {
  localStorage.setItem('dadosUsuarios', JSON.stringify(dados));
}

// Validação de login (admin/1234 ou localStorage)
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

// Abrir modal de registro
$('abrir-registro')?.addEventListener('click', function () {
  $('registro-modal').classList.add('ativo');
  $('registro-erro').style.display = 'none';
  $('registro-sucesso').style.display = 'none';
  $('novo-usuario').value = '';
  $('nova-senha').value = '';
  setTimeout(() => $('novo-usuario').focus(), 100);
});

// Fechar modal de registro
$('fechar-registro')?.addEventListener('click', function () {
  $('registro-modal').classList.remove('ativo');
});

// Registro de novo usuário (localStorage)
$('registro-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const user = $('novo-usuario').value.trim();
  const pass = $('nova-senha').value;
  const erro = $('registro-erro');
  const sucesso = $('registro-sucesso');

  if (!user || !pass) {
    erro.textContent = 'Preencha todos os campos.';
    erro.style.display = 'block';
    sucesso.style.display = 'none';
    return;
  }
  if (user.length < 3 || pass.length < 3) {
    erro.textContent = 'Usuário e senha devem ter pelo menos 3 caracteres.';
    erro.style.display = 'block';
    sucesso.style.display = 'none';
    return;
  }
  if (/[^a-zA-Z0-9_]/.test(user)) {
    erro.textContent = 'Usuário só pode conter letras, números e _.';
    erro.style.display = 'block';
    sucesso.style.display = 'none';
    return;
  }
  let users = getUsuarios();
  if (users[user] || user === 'admin') {
    erro.textContent = 'Usuário já existe.';
    erro.style.display = 'block';
    sucesso.style.display = 'none';
    return;
  }
  users[user] = pass;
  setUsuarios(users);

  // Cria dados vazios para o novo usuário
  let dadosUsuarios = getDadosUsuarios();
  dadosUsuarios[user] = [];
  setDadosUsuarios(dadosUsuarios);

  erro.style.display = 'none';
  sucesso.style.display = 'block';
  setTimeout(() => {
    $('registro-modal').classList.remove('ativo');
  }, 1200);
});

// Fechar modal ao clicar fora do conteúdo
$('registro-modal')?.addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.remove('ativo');
  }
});

// Fechar modal ao pressionar ESC (só se estiver aberto)
document.addEventListener('keydown', function(e) {
  if (
    e.key === 'Escape' &&
    $('registro-modal')?.classList.contains('ativo')
  ) {
    $('registro-modal').classList.remove('ativo');
  }
});

// Acessibilidade: foca no botão fechar ao abrir o modal pelo teclado
$('abrir-registro')?.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    setTimeout(() => $('fechar-registro').focus(), 200);
  }
});