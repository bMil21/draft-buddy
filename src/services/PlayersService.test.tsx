import React from 'react';
import mockPlayers from '../mocks/mock-players';
import EspnDraftRepo from '../repos/EspnDraftRepo';
import PlayersService from './PlayersService';

let service: PlayersService;

beforeEach(() => {
  // mock local storage
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => JSON.stringify(mockPlayers[1])),
      setItem: jest.fn(() => null),
      removeItem: jest.fn(() => null),
    },
    writable: true,
  });

  service = new PlayersService(new EspnDraftRepo());
});

it('should get cached players', () => {
  const cachedPlayers = service.getCachedPlayers();
  expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  expect(cachedPlayers).toEqual(mockPlayers[1]);
});

it('should return an empty [] when there are no cached players', () => {
  jest.spyOn(window.localStorage, 'getItem').mockReturnValue(JSON.stringify([]));
  const cachedPlayers = service.getCachedPlayers();
  expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  expect(cachedPlayers).toEqual([]);
});
