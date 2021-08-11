import DraftRepo from '../models/DraftRepo';
import { PlayerMap, PlayerModel } from '../models/PlayerModel';

interface LocalDraftPlayer {
  player_id: number;
  name: string;
  position: string;
  team: string;
  adp: number;
  adp_formatted: string;
  times_drafted: number;
  high: number;
  low: number;
  stdev: number;
  bye: number;
}

class LocalDraftRepo implements DraftRepo {
  /**
   * Get Players from local JSON
   * @returns {Promise<PlayerModel[]}
   */
  getPlayers = (): Promise<PlayerModel[]> => {
    return fetch(
      'assets/data/players.json',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    ).then(res => {
      return res.json();
    }).then(json => {
      return json.players.map((player: LocalDraftPlayer) => this.convertToPlayerModel(player));
    }).catch((e: Error) => {
      console.log('Error getting players', e);
    });
  }

  convertToPlayerModel(json: LocalDraftPlayer): PlayerModel {
    const map: PlayerMap = {
      playerId: json['player_id'] ?? null,
      name: json['name'] ?? null,
      position: json['position'] ?? null,
      team: json['team'] ?? null,
      adp: json['adp'] ?? null,
      adpFormatted: json['adp_formatted'] ?? null,
      timesDrafted: json['times_drafted'] ?? null,
      high: json['high'] ?? null,
      low: json['low'] ?? null,
      stdev: json['stdev'] ?? null,
      bye: json['bye'] ?? null,
      picked: false,
      faved: false,
    };
    return new PlayerModel(map);
  }
}

export default LocalDraftRepo;
