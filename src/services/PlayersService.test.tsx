import React from 'react';
import mockDraftRepo, { MockDraftRepo } from '../mocks/mock-draft-repo';
import mockPlayers from '../mocks/mock-players';
import PlayerModel from '../models/PlayerModel';
import PlayersService from './PlayersService';

let service: PlayersService;
let players: PlayerModel[];

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

  service = new PlayersService(mockDraftRepo);
  players = JSON.parse(JSON.stringify(mockPlayers));
  (service['_repo'] as MockDraftRepo).getPlayers.mockResolvedValue(players);
});

it('should return cached players', async () => {
  jest.spyOn(service, 'getCachedPlayers').mockReturnValue([mockPlayers[1],]);
  const players = await service.getPlayers();
  expect(service.getCachedPlayers).toHaveBeenCalledTimes(1);
  expect(players).toEqual([mockPlayers[1],]);
});

it('should not have cached players, but fetch and save new players', async () => {
  jest.spyOn(service, 'getCachedPlayers');
  jest.spyOn(service, 'fetchPlayers').mockResolvedValue([]);
  jest.spyOn(service, 'savePlayers');
  const players = await service.getPlayers();
  expect(service.getCachedPlayers).toHaveBeenCalledTimes(1);
  expect(service.fetchPlayers).toHaveBeenCalledTimes(1);
  expect(service.savePlayers).toHaveBeenCalledWith([]);
  expect(players).toEqual([]);
});

it('should cache BACKUP players', () => {
  jest.spyOn(window.localStorage, 'setItem');
  service.saveBackupPlayers(players);
  expect(window.localStorage.setItem).toHaveBeenCalledWith('backupPlayers', JSON.stringify(players));
});

it('should NOT have BACKUP players to save', () => {
  jest.spyOn(console, 'log');
  service.saveBackupPlayers([]);
  expect(console.log).toHaveBeenCalledWith('No backup players to save');
});


it('should save players', () => {
  jest.spyOn(service, 'saveBackupPlayers');
  jest.spyOn(service, 'getCachedPlayers').mockReturnValue(players);
  jest.spyOn(window.localStorage, 'setItem');

  service.savePlayers(players);

  expect(service.saveBackupPlayers).toHaveBeenCalledWith(players);
  expect(window.localStorage.setItem).toHaveBeenCalledWith('players', JSON.stringify(players));
});


it('should NOT have players to save', () => {
  jest.spyOn(service, 'saveBackupPlayers');
  jest.spyOn(service, 'getCachedPlayers').mockReturnValue(players);
  jest.spyOn(window.localStorage, 'setItem');
  jest.spyOn(console, 'log');

  service.savePlayers([]);

  expect(service.saveBackupPlayers).not.toHaveBeenCalled();
  expect(service.getCachedPlayers).not.toHaveBeenCalled();
  expect(window.localStorage.setItem).not.toHaveBeenCalled();
  expect(console.log).toHaveBeenCalledWith('No players to save');
});


it('should clear cached players', () => {
  //
});

it('should reset players to default values', () => {
  //
});

// TODO: Test UPDATE Players... smaller functions

it('should get players from local storage', () => {
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

// TODO: Test toggle player prop

it('should fetch new players', async () => {
  const players = await service.fetchPlayers();
  expect(players).toEqual(players);
});

it('should fail to fetch players', async () => {
  jest.spyOn(console, 'log');
  (service['_repo'] as MockDraftRepo).getPlayers.mockRejectedValue([]);
  const players = await service.fetchPlayers();
  expect(console.log).toHaveBeenCalledTimes(1);
  expect(players).toEqual([]);
});
