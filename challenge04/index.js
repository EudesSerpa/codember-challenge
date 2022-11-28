// Code from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
const range = (start, stop, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const LOWER_LIMIT_PASSWORDS = 11098;
const UPPER_LIMIT_PASSWORDS = 98123;
const PASSWORD_LENGTH = 5;
const RESPONSE_IDX = 55;

const getPasswordsRange = () =>
  range(LOWER_LIMIT_PASSWORDS, UPPER_LIMIT_PASSWORDS);

const validPassword = (password = "") => {
  /* Casos base: Password incorrecto
    1. El password está entre los números 11098 y 98123 (No aplicado)
      password < 11098 || password > 98123
    2. Es una contraseña de 5 dígitos
      password.length !== 5
    3. Tiene al menos dos numeros 5
      password.match(/5/g)?.length < 2
    4. El número a la derecha siempre es mayor o igual que el que tiene a la izquierda
      password[i + 1] < password[i]
  */
  const hasFiveDigits = password.length === PASSWORD_LENGTH;
  const hasAtLeastAFiveTwice = password.match(/5/g)?.length >= 2;

  if (!hasFiveDigits || !hasAtLeastAFiveTwice) return false;

  const elements = password.split("");
  for (let idx = 0; idx < PASSWORD_LENGTH; idx++) {
    if (elements[idx + 1] < elements[idx]) return false;
  }

  return true;
};

const getValidPasswords = (possiblePasswords = []) =>
  possiblePasswords.filter((psw) => validPassword(psw.toString()));

const possiblePasswords = getPasswordsRange();
const validPasswords = getValidPasswords(possiblePasswords);

const response = `submit ${validPasswords.length}-${validPasswords[RESPONSE_IDX]}`;
console.log(response);
