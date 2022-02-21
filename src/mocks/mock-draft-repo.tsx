import DraftRepo from '../models/DraftRepo';
import PlayerModel from '../models/PlayerModel';

// export const mockGetPlayers = jest.fn();
// const mockDraftRepo: DraftRepo = jest.fn().mockImplementation(() => {
//   return {
//     getPlayers: mockGetPlayers,
//   };
// });


export class MockDraftRepo implements DraftRepo {
  public getPlayers: jest.Mock<Promise<PlayerModel[]>, []> = jest.fn(() => {
    return Promise.resolve([]);
  });
}

const mockDraftRepo = new MockDraftRepo();

export default mockDraftRepo;