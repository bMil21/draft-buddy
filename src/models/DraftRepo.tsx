import PlayerModel from './PlayerModel';

interface DraftRepo {
  getPlayers(): Promise<PlayerModel[]>;
}

export default DraftRepo;