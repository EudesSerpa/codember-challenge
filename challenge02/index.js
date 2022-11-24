const codedMessage =
  "11610497110107115 102111114 11210897121105110103 9911110010110998101114 11210810197115101 11510497114101";

const CODE_LENGTH_A_TO_C = 2; // 97 - 99
const INIT_CODE_A_TO_C = 9;
const CODE_LENGTH_D_TO_Z = 3; // 100 - 122
const INIT_CODE_D_TO_Z = 1;

const decodeLetter = ({ idx, code, wordCodes }) => {
  let newIdx = idx;
  let charCodes = [];

  if (code === INIT_CODE_A_TO_C) {
    charCodes = wordCodes.slice(idx, idx + CODE_LENGTH_A_TO_C);
    newIdx += CODE_LENGTH_A_TO_C;
  } else if (code === INIT_CODE_D_TO_Z) {
    charCodes = wordCodes.slice(idx, idx + CODE_LENGTH_D_TO_Z);
    newIdx += CODE_LENGTH_D_TO_Z;
  }

  const decodedLetter = String.fromCharCode(charCodes.join(""));
  return [decodedLetter, newIdx - 1];
};

const decodeWord = (asciiWord) => {
  const wordCodes = asciiWord.split("");
  const wordDecoded = [];

  for (let idx = 0; idx < wordCodes.length; idx++) {
    const code = Number(wordCodes[idx]);

    const [letter, newIdx] = decodeLetter({ idx, code, wordCodes });

    idx = newIdx;
    wordDecoded.push(letter);
  }

  return wordDecoded.join("");
};

const decodeMessage = (message) => {
  const asciiWords = message.split(" ");
  const wordsDecoded = [];

  asciiWords.forEach((asciiWord) => {
    wordsDecoded.push(decodeWord(asciiWord));
    wordsDecoded.push(" ");
  });

  return wordsDecoded.join("").trim();
};

const decodedMessage = decodeMessage(codedMessage);
console.log(decodedMessage);
