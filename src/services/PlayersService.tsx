import DraftRepo from '../models/DraftRepo';
import PlayerModel from '../models/PlayerModel';

export interface IPlayersService {
  getPlayers: () => Promise<PlayerModel[]>;
  getCachedPlayers: () => PlayerModel[];
  fetchPlayers: () => Promise<PlayerModel[]>;
  savePlayers: (players: PlayerModel[]) => void;
  resetPlayers: (players: PlayerModel[]) => Promise<PlayerModel[]>;
  updatePlayers: () => Promise<PlayerModel[]>;
  togglePlayerProp: (
    players: PlayerModel[],
    favedPlayer: PlayerModel,
    key: keyof PlayerModel
  ) => PlayerModel[];
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
      const newPlayers = await this.fetchPlayers();
      this.savePlayers(newPlayers);
      return newPlayers;
    }
  };

  saveBackupPlayers = (players: PlayerModel[]): void => {
    if (players && players.length > 0) {
      localStorage.setItem('backupPlayers', JSON.stringify(players));
    } else {
      console.log('No backup players to save');
    }
  };

  savePlayers = (players: PlayerModel[]): void => {
    if (players && players.length > 0) {
      this.saveBackupPlayers(this.getCachedPlayers());
      localStorage.setItem('players', JSON.stringify(players));
    } else {
      // TODO: snackbar
      console.log('No players to save');
    }
  };

  clearCachedPlayers = (): void => {
    localStorage.removeItem('players');
  };

  resetPlayers = async (players: PlayerModel[]): Promise<PlayerModel[]> => {
    return players.map(player => Object.assign(
      {}, player, { faved: false, picked: false, }
    ));
  };

  updatePlayersWithCachedValues = (
    newPlayers: PlayerModel[],
    cachedPlayers: PlayerModel[]
  ): PlayerModel[] => {
    // forEach fetched player
    // find equivalent in cache (since order might b different)
    return newPlayers.map((newPlayer) => {
      const foundCachedPlayer = cachedPlayers.find((cachedPlayer) => {
        return newPlayer.name === cachedPlayer.name;
      });
      if (foundCachedPlayer) {
        return Object.assign({}, newPlayer, {
          picked: foundCachedPlayer.picked,
          faved: foundCachedPlayer.faved,
        });
      } else {
        return newPlayer;
      }
    });
  };

  updatePlayers = async (): Promise<PlayerModel[]> => {
    // fetch players
    const newPlayers = await this.fetchPlayers();
    // if no players... abort, notify
    if (!newPlayers || newPlayers.length < 1) {
      console.warn('No new players', newPlayers);
      return this.getCachedPlayers();
    }
    const cachedPlayers = this.getCachedPlayers();
    if (!cachedPlayers || cachedPlayers.length < 1) {
      console.warn('No cached players', newPlayers);
      return newPlayers;
    }
    const updatedPlayers = this.updatePlayersWithCachedValues(newPlayers, cachedPlayers);
    return updatedPlayers;
  };

  getCachedPlayers = (): PlayerModel[] => {
    const cachedPlayers = localStorage.getItem('players');
    if (cachedPlayers && cachedPlayers.length > 0) {
      return JSON.parse(cachedPlayers);
    } else {
      return [];
    }
  };

  togglePlayerProp = (
    players: PlayerModel[],
    targetedPlayer: PlayerModel,
    key: keyof PlayerModel
  ): PlayerModel[] => {
    return players.map((player) => {
      return (targetedPlayer.playerId === player.playerId)
        ? Object.assign({}, player, { [key]: !targetedPlayer[key], })
        : player;
    });
  };

  fetchPlayers = async (): Promise<PlayerModel[]> => {
    let players: PlayerModel[] = [];
    try {
      players = await this._repo.getPlayers();
    } catch (e) {
      console.log('Error getting players', e);
    }
    return players;
  };
}

export default PlayersService;

// Functional Approach
// 
// import DraftRepo from '../repos/LocalDraftRepo';
// const getPlayers = (repo: DraftRepo) => {...}
// export default {
//   getPlayers: getPlayers,
// };
