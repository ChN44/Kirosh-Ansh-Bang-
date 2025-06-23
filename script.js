document.getElementById("generate").addEventListener("click", function () {
      const length = parseInt(document.getElementById("length").value);
      const useSymbols = document.getElementById("symbols").checked;
      const useNumbers = document.getElementById("numbers").checked;
      const useUppercase = document.getElementById("uppercase").checked;
      const useLowercase = document.getElementById("lowercase").checked;

      const password = generatePassword(length, useSymbols, useNumbers, useUppercase, useLowercase);
      document.getElementById("password").value = password;
    });

    document.getElementById("copy").addEventListener("click", function () {
      const password = document.getElementById("password").value;
      navigator.clipboard.writeText(password)
        .then(() => alert("Senha copiada!"))
        .catch(() => alert("Erro ao copiar senha."));
    });

    function generatePassword(length, useSymbols, useNumbers, useUppercase, useLowercase) {
      const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";
      const numbers = "0123456789";
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";

      let available = "";
      const mandatory = [];

      if (useSymbols) {
        available += symbols;
        mandatory.push(symbols[Math.floor(Math.random() * symbols.length)]);
      }
      if (useNumbers) {
        available += numbers;
        mandatory.push(numbers[Math.floor(Math.random() * numbers.length)]);
      }
      if (useUppercase) {
        available += uppercase;
        mandatory.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
      }
      if (useLowercase) {
        available += lowercase;
        mandatory.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
      }

      if (!available) {
        available = symbols + numbers + uppercase + lowercase;
      }

      let password = mandatory.join("");
      for (let i = password.length; i < length; i++) {
        password += available[Math.floor(Math.random() * available.length)];
      }

      return shuffle(password);
    }

    function shuffle(str) {
      return str.split('').sort(() => Math.random() - 0.5).join('');
    }

    document.getElementById("copy").addEventListener("click", function () {
  const apelido = document.getElementById("password-name").value.trim();
  const senha = document.getElementById("password").value;
  let texto = senha;
  if (apelido) {
    texto = `${apelido}: ${senha}`;
  }
  navigator.clipboard.writeText(texto)
    .then(() => {
      this.textContent = "Copiado!";
      setTimeout(() => this.textContent = "Copiar", 1200);
    });
});