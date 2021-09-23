import DraftRepo from '../models/DraftRepo';
import PlayerModel, { PlayerMap } from '../models/PlayerModel';

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
  picked?: boolean;
  faved?: boolean;
}

class LocalDraftRepo implements DraftRepo {
  /**
   * Get Players from local JSON
   * @returns {Promise<PlayerModel[]}
   */
  getPlayers = (): Promise<PlayerModel[]> => {
    // TODO: abstract layer for fetch in case we want to use axios, etc.
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
    }).then((json) => {
      return json.players.map((player: LocalDraftPlayer, index: number) => this.convertToPlayerModel(player, index));
    }).catch((e: Error) => {
      console.error('Error getting players', e);
    });
  }

  convertToPlayerModel(json: LocalDraftPlayer, index: number): PlayerModel {
    const map: PlayerMap = {
      playerId: json['player_id'] ?? null,
      num: index + 1,
      name: json['name'] ?? null,
      position: json['position'] ?? null,
      team: json['team'] ?? null,
      adp: json['adp'] ?? null,
      timesDrafted: json['times_drafted'] ?? null,
      high: json['high'] ?? null,
      low: json['low'] ?? null,
      stdev: json['stdev'] ?? null,
      bye: json['bye'] ?? null,
      picked: json['picked'] ?? false,
      faved: json['faved'] ?? false,
    };
    return new PlayerModel(map);
  }
}

export default LocalDraftRepo;
