
export class PlayerModel {
  playerId: number;
  name: string;
  position: string;
  team: string;
  adp: number;
  adpFormatted: string;
  timesDrafted: number;
  high: number;
  low: number;
  stdev: number;
  bye: number;
  picked: boolean;
  faved: boolean;

  constructor(map: PlayerMap) {
    this.playerId = map.playerId;
    this.name = map.name;
    this.position = map.position;
    this.team = map.team;
    this.adp = map.adp;
    this.adpFormatted = map.adpFormatted;
    this.timesDrafted = map.timesDrafted;
    this.high = map.high;
    this.low = map.low;
    this.stdev = map.stdev;
    this.bye = map.bye;
    this.picked = map.picked;
    this.faved = map.faved;
  }
}

export interface PlayerMap {
  playerId: number;
  name: string;
  position: string;
  team: string;
  adp: number;
  adpFormatted: string;
  timesDrafted: number;
  high: number;
  low: number;
  stdev: number;
  bye: number;
  picked: boolean;
  faved: boolean;
}
