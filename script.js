document.getElementById("generate").addEventListener("click", function() {
  const length = document.getElementById("length").value;
  const useSymbols = document.getElementById("symbols").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useUppercase = document.getElementById("uppercase").checked;
  const useLowercase = document.getElementById("lowercase").checked;

  const password = generatePassword(length, useSymbols, useNumbers, useUppercase, useLowercase);
  document.getElementById("password").value = password;
});

document.getElementById("copy").addEventListener("click", function() {
  const passwordField = document.getElementById("password");
  passwordField.select();
  document.execCommand("copy");
});

function generatePassword(length, useSymbols, useNumbers, useUppercase, useLowercase) {
  const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";
  const numbers = "0123456789";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";

  let characters = "";

  if (useSymbols) characters += symbols;
  if (useNumbers) characters += numbers;
  if (useUppercase) characters += uppercase;
  if (useLowercase) characters += lowercase;

  if (characters.length === 0) characters = lowercase + uppercase + numbers + symbols;  // Default fallback

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}