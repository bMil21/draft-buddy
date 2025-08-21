import EspnDraftRepo from '../repos/EspnDraftRepo';
import LocalDraftRepo from '../repos/LocalDraftRepo';
import DraftRepo from './DraftRepo';

export enum DraftRepoEnum {
  espn = 'espn',
  local = 'local',
  local2024 = 'local2024',
  ffballCalc = 'ffballCalc',
  local2025 = 'local2025',
}

const DraftRepoMap = new Map<DraftRepoEnum, DraftRepo>([
  [DraftRepoEnum.espn, new EspnDraftRepo(),],
  [DraftRepoEnum.local, new LocalDraftRepo('assets/data/espn-players-2024.json'),],
  [DraftRepoEnum.local2024, new LocalDraftRepo('assets/data/espn-players-2024.json'),],
  [DraftRepoEnum.ffballCalc, new LocalDraftRepo('assets/data/espn-players-2024.json'),],
  [DraftRepoEnum.ffballCalc, new LocalDraftRepo('assets/data/espn-players-2025.json'),],
]);

export default DraftRepoMap;
