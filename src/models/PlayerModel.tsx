
class PlayerModel {
  playerId: number;
  num?: number;
  name: string;
  position: string;
  team: string;
  adp: number;
  timesDrafted: number;
  high: number;
  low: number;
  stdev: number;
  bye: number;
  picked?: boolean;
  faved?: boolean;

  constructor(map: PlayerMap) {
    this.playerId = map.playerId;
    this.num = map.num;
    this.name = map.name;
    this.position = map.position;
    this.team = map.team;
    this.adp = map.adp;
    this.timesDrafted = map.timesDrafted;
    this.high = map.high;
    this.low = map.low;
    this.stdev = map.stdev;
    this.bye = map.bye;
    this.picked = map.picked;
    this.faved = map.faved;
  }
}

export default PlayerModel;

export interface PlayerMap {
  playerId: number;
  num: number;
  name: string;
  position: string;
  team: string;
  adp: number;
  timesDrafted: number;
  high: number;
  low: number;
  stdev: number;
  bye: number;
  picked: boolean;
  faved: boolean;
}

export interface PlayerModelProp {
  key: keyof PlayerModel;
  value: PlayerModel[keyof PlayerModel];
}

// export type PlayerModelMap = Map<string, string>;
