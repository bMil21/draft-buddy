import EspnDraftRepo from '../repos/EspnDraftRepo';
import LocalDraftRepo from '../repos/LocalDraftRepo';
import DraftRepo from './DraftRepo';

export enum DraftRepoEnum {
  espn = 'espn',
  local = 'local',
  ffballCalc = 'ffballCalc',
}

const DraftRepoMap = new Map<DraftRepoEnum, DraftRepo>([
  [DraftRepoEnum.espn, new EspnDraftRepo(),],
  [DraftRepoEnum.local, new LocalDraftRepo(),],
  [DraftRepoEnum.ffballCalc, new LocalDraftRepo(),],
]);

export default DraftRepoMap;
