document.getElementById("generate").addEventListener("click", function () {
  const length = parseInt(document.getElementById("length").value);
  const useSymbols = document.getElementById("symbols").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useUppercase = document.getElementById("uppercase").checked;
  const useLowercase = document.getElementById("lowercase").checked;

  if (!useSymbols && !useNumbers && !useUppercase && !useLowercase) {
    alert("Selecione pelo menos uma opção: símbolos, números, maiúsculas ou minúsculas.");
    return;
  }

  const password = generatePassword(length, useSymbols, useNumbers, useUppercase, useLowercase);
  document.getElementById("password").value = password;

    const apelido = document.getElementById("password-name").value.trim();
  if (apelido) {
    salvarSenha(apelido, password);
  }
});


document.getElementById("copy").addEventListener("click", function () {
  const apelido = document.getElementById("password-name").value.trim();
  const senha = document.getElementById("password").value;

  if (!senha) {
    alert("Nenhuma senha gerada para copiar.");
    return;
  }

  const texto = apelido ? `${apelido}: ${senha}` : senha;

  navigator.clipboard.writeText(texto)
    .then(() => {
      this.textContent = "Copiado!";
      setTimeout(() => this.textContent = "Copiar", 1200);
    })
    .catch(() => alert("Erro ao copiar senha."));
});

// banco de senhas
function salvarSenha(apelido, senha) {
  if (!apelido || !senha) return;
  const banco = JSON.parse(localStorage.getItem('bancoSenhas') || '[]');
  banco.push({ apelido, senha });
  localStorage.setItem('bancoSenhas', JSON.stringify(banco));
  atualizarBancoSenhas();
}

function atualizarBancoSenhas() {
  const banco = JSON.parse(localStorage.getItem('bancoSenhas') || '[]');
  const lista = document.getElementById('banco-senhas');
  if (!lista) return;
  lista.innerHTML = '';
  banco.slice(-5).reverse().forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.apelido}: ${item.senha}`;
    lista.appendChild(li);
  });
}

function salvarSenha(apelido, senha) {
  if (!apelido || !senha) return;
  let banco = JSON.parse(localStorage.getItem('bancoSenhas') || '[]');
  banco.push({ apelido, senha });
  if (banco.length > 10) banco = banco.slice(-10); // mantém só as 10 últimas
  localStorage.setItem('bancoSenhas', JSON.stringify(banco));
  atualizarBancoSenhas();
}

function atualizarBancoSenhas() {
  const banco = JSON.parse(localStorage.getItem('bancoSenhas') || '[]');
  const lista = document.getElementById('banco-senhas');
  if (!lista) return;
  lista.innerHTML = '';
  if (banco.length === 0) {
    lista.innerHTML = '<li style="color:#888;">Nenhuma senha salva.</li>';
    return;
  }
  banco.slice().reverse().forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${item.apelido}:</strong> ${item.senha}</span>
      <button class="banco-btn" title="Copiar" data-copiar="${item.senha}">📋</button>
      <button class="banco-btn" title="Remover" data-remover="${banco.length - 1 - idx}">🗑️</button>`;
    lista.appendChild(li);
  });

  // Botão copiar individual
  lista.querySelectorAll('[data-copiar]').forEach(btn => {
    btn.onclick = function() {
      navigator.clipboard.writeText(this.getAttribute('data-copiar'));
      this.textContent = "✔️";
      setTimeout(() => this.textContent = "📋", 1000);
    };
  });

  // Botão remover individual
  lista.querySelectorAll('[data-remover]').forEach(btn => {
    btn.onclick = function() {
      let banco = JSON.parse(localStorage.getItem('bancoSenhas') || '[]');
      banco.splice(this.getAttribute('data-remover'), 1);
      localStorage.setItem('bancoSenhas', JSON.stringify(banco));
      atualizarBancoSenhas();
    };
  });
}

// Limpar todo o histórico
document.getElementById("limpar-banco").addEventListener("click", function () {
  if (confirm("Tem certeza que deseja limpar todo o histórico de senhas?")) {
    localStorage.removeItem('bancoSenhas');
    atualizarBancoSenhas();
  }
});

// Atualiza lista ao carregar a página
window.addEventListener('DOMContentLoaded', atualizarBancoSenhas);


function generatePassword(length, useSymbols, useNumbers, useUppercase, useLowercase) {
  const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";
  const numbers = "0123456789";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";

  let available = "";
  const mandatory = [];

  if (useSymbols) {
    available += symbols;
    mandatory.push(randomChar(symbols));
  }
  if (useNumbers) {
    available += numbers;
    mandatory.push(randomChar(numbers));
  }
  if (useUppercase) {
    available += uppercase;
    mandatory.push(randomChar(uppercase));
  }
  if (useLowercase) {
    available += lowercase;
    mandatory.push(randomChar(lowercase));
  }

  if (!available) {
    available = symbols + numbers + uppercase + lowercase;
  }

  let password = mandatory.join("");
  for (let i = password.length; i < length; i++) {
    password += randomChar(available);
  }

  return shuffle(password);
}

function randomChar(set) {
  return set[Math.floor(Math.random() * set.length)];
}

function shuffle(str) {
  return str.split('').sort(() => Math.random() - 0.5).join('');
}