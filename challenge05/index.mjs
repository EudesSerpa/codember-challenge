import { mecenas } from "./mecenas.mjs";

const MARK_DEATH = "X";
const players = [...mecenas];
const survivors = { quantity: players.length, players: [], index: null };

const findIndexNextVictim = (players) =>
  players.findIndex((player) => player !== MARK_DEATH);

while (survivors.quantity > 1) {
  players.forEach((player, idx, arr) => {
    if (player !== MARK_DEATH) {
      let indexNextVictim = findIndexNextVictim(arr.slice(idx + 1));

      if (indexNextVictim === -1) {
        indexNextVictim = findIndexNextVictim(arr);
      } else {
        indexNextVictim += idx + 1;
      }

      players.splice(indexNextVictim, 1, MARK_DEATH);
      survivors.index = idx;
    }
  });

  survivors.players = players.filter((player) => player !== MARK_DEATH);
  survivors.quantity = survivors.players.length;
}

console.log(survivors);
