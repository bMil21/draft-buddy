
const getMyPicks = (myPick: number, teams: number, rounds: number, snake: boolean): number[] => {
  if (snake) {
    // snake draft
    return getPicksForSnake(myPick, teams, rounds);
  } else {
    // regular draft
    return getPicksForRegular(myPick, teams, rounds);
  }
};

const getPicksForSnake = (myPick: number, teams: number, rounds: number): number[] => {
  const myPicks = [];
  const fullLoop = teams * 2;
  let currLoop = 0;
  for (let i = 0; i < rounds; i++) {
    const currRound = i + 1;
    let pick;
    // each round
    if (currRound % 2 === 0) {
      // even round
      pick = currLoop - myPick + 1;
    } else {
      // odd round
      pick = currLoop + myPick;
      currLoop = currLoop + fullLoop;
    }
    myPicks.push(pick);
  }
  return myPicks;
};

const getPicksForRegular = (myPick: number, teams: number, rounds: number): number[] => {
  const myPicks = [];
  let currPick = 0;
  for (let i = 0; i < rounds; i++) {
    if (i < 1) {
      currPick = myPick;
    } else {
      currPick += teams;
    }
    myPicks.push(currPick);
  }
  return myPicks;
};

export default {
  getMyPicks: getMyPicks,
  getPicksForSnake: getPicksForSnake,
  getPicksForRegular: getPicksForRegular,
};
