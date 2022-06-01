import React from 'react';
import EspnDraftRepo, { EspnDraftResponse } from './EspnDraftRepo';

let repo: EspnDraftRepo;

const mockJson: EspnDraftResponse = {
  players: [
    {
      player: {
        fullName: 'John Doe',
        id: 1,
        defaultPositionId: 5,
        ownership: {
          averageDraftPosition: 23,
        },
        proTeamId: 21,
        picked: true,
        faved: true,
      },
    },
  ],
};

const expectedPlayers = [
  {
    'adp': 23,
    'bye': 0,
    'faved': true,
    'high': 0,
    'low': 0,
    'name': 'John Doe',
    'num': 1,
    'picked': true,
    'playerId': 1,
    'position': 'K',
    'stdev': 0,
    'team': 'PHI',
    'timesDrafted': 0,
  },
];

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  global.fetch = jest.fn(() => Promise.resolve({ json: () => mockJson, })) as jest.Mock;

  repo = new EspnDraftRepo();
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('should get players', async () => {
  const players = await repo.getPlayers();
  expect(players).toEqual(expectedPlayers);
});
