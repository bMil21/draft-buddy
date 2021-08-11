import DraftRepo from '../models/DraftRepo';
import { PlayerModel } from '../models/PlayerModel';

class PlayersService {
  private repo: DraftRepo;

  constructor(repo: DraftRepo) {
    this.repo = repo;
  }

  /**
   * Get Players from Given Repo
   */
  getPlayers = async (): Promise<PlayerModel[]> => {
    const cachedPlayers = localStorage.getItem('players');
    let players: PlayerModel[] = [];

    if (cachedPlayers && cachedPlayers.length > 0) {
      // Use Cache
      console.log('Use Cache:', cachedPlayers);
      players = JSON.parse(cachedPlayers);
    } else {
      // Fetch Players
      console.log('Fetch players');
      try {
        players = await this.repo.getPlayers();
        localStorage.setItem('players', JSON.stringify(players));
      } catch (e) {
        console.log('Error getting players', e);
      }
    }

    return players;
  };
}

export default PlayersService;
