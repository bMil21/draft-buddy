import DraftRepo from '../models/DraftRepo';
import PlayerModel from '../models/PlayerModel';
import espnFantasyFilterHeader from '../utilities/espn-fantasy-filter-header.json';

type PositionMapType = Record<1 | 2 | 3 | 4 | 5 | 16, string>;
type TeamMapType = Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 33 | 34,
  string>;

export interface EspnDraftResponse {
  players: EspnDraftPlayerObj[];
}

export interface EspnDraftPlayerObj {
  player: EspnDraftPlayer;
}

export interface EspnDraftPlayer {
  fullName: string;
  id: number;
  defaultPositionId: keyof PositionMapType;
  ownership: EspnDraftOwnership;
  proTeamId: keyof TeamMapType;
  picked?: boolean;
  faved?: boolean;
}

export interface EspnDraftOwnership {
  averageDraftPosition: number;
}

const positionMap: PositionMapType = {
  1: 'QB',
  2: 'RB',
  3: 'WR',
  4: 'TE',
  5: 'K',
  16: 'DEF',
};

const teamMap: TeamMapType = {
  1: 'ATL', 2: 'BUF', 3: 'CHI', 4: 'CIN', 5: 'CLE',
  6: 'DAL', 7: 'DEN', 8: 'DET', 9: 'GB', 10: 'TEN',
  11: 'IND', 12: 'KC', 13: 'LV', 14: 'LAR', 15: 'MIA',
  16: 'MIN', 17: 'NE', 18: 'NO', 19: 'NYG', 20: 'NYJ',
  21: 'PHI', 22: 'ARI', 23: 'PIT', 24: 'LAC', 25: 'SF',
  26: 'SEA', 27: 'TB', 28: 'WAS', 29: 'CAR', 30: 'JAX',
  33: 'BAL', 34: 'HOU',
};

class EspnDraftRepo implements DraftRepo {
  private _url = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons/2021/segments/0/leaguedefaults/3?scoringPeriodId=0&view=kona_player_info';

  getPlayers = async (): Promise<PlayerModel[]> => {
    const res = await this.fetchPlayers();
    if (res?.players) {
      return this.convertToPlayerModel(res.players);
    } else {
      return [];
    }
  };

  fetchPlayers = async (): Promise<EspnDraftResponse> => {
    try {
      const res = await fetch(
        this._url,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'x-fantasy-filter': JSON.stringify(espnFantasyFilterHeader),
          },
        }
      );
      console.log('RES:', res);
      return res.json();
    } catch (e) {
      console.error('Error getting players', e);
      return { players: [], };
    }
  }

  convertToPlayerModel = (players: EspnDraftPlayerObj[]): PlayerModel[] => {
    return players.map((playerObj: EspnDraftPlayerObj, index: number) => {
      const player = playerObj.player;
      return new PlayerModel({
        playerId: player['id'] ?? null,
        num: index + 1,
        name: player['fullName'] ?? null,
        position: positionMap[player.defaultPositionId] ?? 'N/A',
        team: teamMap[player.proTeamId] ?? 'N/A',
        adp: Math.floor(player.ownership.averageDraftPosition) ?? 0,
        timesDrafted: 0,
        high: 0,
        low: 0,
        stdev: 0,
        bye: 0,
        picked: player['picked'] ?? false,
        faved: player['faved'] ?? false,
      });
    });
  }
}

export default EspnDraftRepo;
