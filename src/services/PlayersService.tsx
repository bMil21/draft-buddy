import DraftRepo from '../models/DraftRepo';
import PlayerModel from '../models/PlayerModel';

export interface IPlayersService {
  getPlayers: () => Promise<PlayerModel[]>;
  getCachedPlayers: () => PlayerModel[];
  fetchPlayers: () => Promise<PlayerModel[]>;
}

class PlayersService implements IPlayersService {
  private _repo: DraftRepo;

  constructor(repo: DraftRepo) {
    this._repo = repo;
  }

  getPlayers = async (): Promise<PlayerModel[]> => {
    const cachedPlayers = this.getCachedPlayers();

    if (cachedPlayers && cachedPlayers.length > 0) {
      // Use Cache
      console.log('Use Cache:', cachedPlayers);
      return cachedPlayers;
    } else {
      // Fetch Players
      console.log('Fetch players');
      return this.fetchPlayers();
    }
  };

  // updatePlayers = async (): Promise<PlayerModel[]> => {
  //   // fetch players
  //   // if cache, merge (object.assign) fetch with cache
  // };

  getCachedPlayers = (): PlayerModel[] => {
    const cachedPlayers = localStorage.getItem('players');
    if (cachedPlayers && cachedPlayers.length > 0) {
      return JSON.parse(cachedPlayers);
    } else {
      return [];
    }
  };

  fetchPlayers = async (): Promise<PlayerModel[]> => {
    let players: PlayerModel[] = [];
    try {
      players = await this._repo.getPlayers();
      localStorage.setItem('players', JSON.stringify(players));
    } catch (e) {
      console.log('Error getting players', e);
    }
    return players;
  };
}

export default PlayersService;

// import DraftRepo from '../repos/LocalDraftRepo';

// const getPlayers = (repo: DraftRepo) => {...}

// export default {
//   getPlayers: getPlayers,
// };
