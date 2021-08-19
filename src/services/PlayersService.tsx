import DraftRepo from '../models/DraftRepo';
import PlayerModel from '../models/PlayerModel';

export interface IPlayersService {
  getPlayers: () => Promise<PlayerModel[]>;
  getCachedPlayers: () => PlayerModel[];
  fetchPlayers: () => Promise<PlayerModel[]>;
  savePlayers: (players: PlayerModel[]) => void;
  resetPlayers: () => Promise<PlayerModel[]>;
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

  savePlayers = (players: PlayerModel[]): void => {
    localStorage.setItem('players', JSON.stringify(players));
  };

  clearPlayers = (): void => {
    localStorage.removeItem('players');
  };

  resetPlayers = async (): Promise<PlayerModel[]> => {
    // fetch players
    // if cache, merge (object.assign) fetch with cache
    this.clearPlayers();
    return await this.getPlayers();
  };

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
      this.savePlayers(players);
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
