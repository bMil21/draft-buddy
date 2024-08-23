import DraftRepo from '../models/DraftRepo';
import PlayerModel, { PlayerMap } from '../models/PlayerModel';

class LocalDraftRepo implements DraftRepo {
  // e.g. 'assets/data/players.json'
  private _url: string;

  constructor(url: string) {
    this._url = url;
  }
  /**
   * Get Players from local JSON
   * @returns {Promise<PlayerModel[]}
   */
  getPlayers = (): Promise<PlayerModel[]> => {
    // TODO: abstract layer for fetch in case we want to use axios, etc.
    return fetch(
      this._url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    ).then(res => {
      return res.json();
    }).then((json) => {
      return json.map(
        (player: Record<string, unknown>, index: number) => this.convertToPlayerModel(player, index)
      );
    }).catch((e: Error) => {
      console.error('Error getting players', e);
    });
  }

  convertToPlayerModel(json: Record<string, unknown>, index: number): PlayerModel {
    const map: PlayerMap = {
      playerId: Number(json['playerId']) ?? Number(json['player_id']) ?? 0,
      num: index + 1,
      name: `${json['name']}` ?? 'N/A',
      position: `${json['position']}` ?? 'N/A',
      team: `${json['team']}` ?? 'N/A',
      adp: Number(json['adp']) ?? 'N/A',
      timesDrafted: Number(json['times_drafted']) ?? 'N/A',
      high: Number(json['high']) ?? 'N/A',
      low: Number(json['low']) ?? 'N/A',
      stdev: Number(json['stdev']) ?? 'N/A',
      bye: Number(json['bye']) ?? 'N/A',
      picked: !!json['picked'] ?? false,
      faved: !!json['faved'] ?? false,
    };
    return new PlayerModel(map);
  }
}

export default LocalDraftRepo;
