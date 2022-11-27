import { colors } from "./colors.mjs";

const getZebras = () => {
  const zebras = [];
  let biggerLength = 0;
  let lastColorInSequence = "";

  for (let idx = 0; idx < colors.length; idx++) {
    /* 
    Casos base
      1. Solo haya un color en la secuencia de la zebra
        !colors[idx + 1] -> Deja de contar y retorna
      2. Color repetido
        color[i] === color[i + 1] -> Deja de contar y retorna
      3. Nuevo color
        colors[idx] !== colors[idx + 2] -> Deja de contar y retorna
    */
    lastColorInSequence = colors[idx + 1];
    biggerLength += 1;

    const repeatedColor = colors[idx] === lastColorInSequence;
    const thirdColor = colors[idx] !== colors[idx + 2];

    if (!lastColorInSequence || repeatedColor || thirdColor) {
      if (thirdColor) biggerLength += 1;

      zebras.push({ length: biggerLength, lastColor: lastColorInSequence });
      biggerLength = 0;
    }
  }

  return zebras;
};

const getBiggerZebra = () =>
  getZebras().reduce(
    (acc, zebra) => {
      if (zebra.length >= acc.length) acc = zebra;
      return acc;
    },
    { length: 0, lastColor: "" }
  );

// Response
const response = getBiggerZebra();
console.log(`${response.length}@${response.lastColor}`);
