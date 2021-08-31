import PlayerModel, { PlayerModelProp } from '../models/PlayerModel';

const filterPlayers = (
  players: PlayerModel[],
  prop: keyof PlayerModel,
  value: PlayerModel[keyof PlayerModel]
): PlayerModel[] => {
  return players.filter((player) => player[prop] === value);
};

const filterPlayers2 = (players: PlayerModel[], playerProps: Set<PlayerModelProp>): PlayerModel[] => {
  const playerPropsArray = Array.from(playerProps);
  return players.filter((player) => {
    return playerPropsArray.some(prop => player[prop.key] === prop.value);
  });
};

const FilterService = {
  filterPlayers: filterPlayers,
  filterPlayers2: filterPlayers2,
};

export default FilterService;
