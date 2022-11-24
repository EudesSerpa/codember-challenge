const codedMessage =
  "11610497110107115 102111114 11210897121105110103 9911110010110998101114 11210810197115101 11510497114101";

const CODE_LENGTH_A_TO_C = 2; // 97 - 99
const INIT_CODE_A_TO_C = 9;
const CODE_LENGTH_D_TO_Z = 3; // 100 - 122
const INIT_CODE_D_TO_Z = 1;

const decodeLetter = (idx, code, asciiWord) => {
  let letterCode = "";

  if (code === INIT_CODE_A_TO_C) {
    letterCode = asciiWord.substring(idx, idx + CODE_LENGTH_A_TO_C);
    idx += CODE_LENGTH_A_TO_C;
  }

  if (code === INIT_CODE_D_TO_Z) {
    letterCode = asciiWord.substring(idx, idx + CODE_LENGTH_D_TO_Z);
    idx += CODE_LENGTH_D_TO_Z;
  }

  const decodedLetter = String.fromCharCode(letterCode);

  return [decodedLetter, idx - 1];
};

const decodeWord = (asciiWord) => {
  let decodedWord = "";

  for (let idx = 0; idx < asciiWord.length; idx++) {
    const init_code = Number(asciiWord.at(idx));

    const [decodedLetter, newIdx] = decodeLetter(idx, init_code, asciiWord);
    idx = newIdx;

    decodedWord += decodedLetter;
  }

  return decodedWord + " ";
};

const decodeMessage = (message) =>
  message
    .split(" ")
    .map((asciiWord) => decodeWord(asciiWord))
    .join("")
    .trim();

const decodedMessage = decodeMessage(codedMessage);
console.log(decodedMessage);
