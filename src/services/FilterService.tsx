import PlayerModel, { PlayerModelProps } from '../models/PlayerModel';

const filterPlayers = (players: PlayerModel[], activeFilters: PlayerModelProps): PlayerModel[] => {
  const activeFiltersArray = Array.from(activeFilters);
  return players.filter((player) => {
    // loop through all of the active filters
    //  and see if the player qualifies
    // i.e. if the active filters include "QB" and "faved",
    //  then the player must be both a QB and favorited/starred
    return activeFiltersArray.every(prop => player[prop[0]] === prop[1]);
  });
};

const FilterService = {
  filterPlayers: filterPlayers,
};

export default FilterService;
