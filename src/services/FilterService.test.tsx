import React from 'react';
import mockPlayers from '../mocks/mock-players';
import PlayerModel, { PlayerModelProps } from '../models/PlayerModel';
import FilterService from './FilterService';

let players: PlayerModel[];
let mockFilters: PlayerModelProps;

beforeEach(() => {
  players = JSON.parse(JSON.stringify(mockPlayers));
  mockFilters = new Map();
});

it('should return the same players', () => {
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(17);
  expect(filteredPlayers).toEqual(mockPlayers);
});

it('should return NO players', () => {
  mockFilters.set('name', 'blah');
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(0);
  expect(filteredPlayers).toEqual([]);
});

it('should return the QBs', () => {
  mockFilters.set('position', 'QB');
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(2);
  expect(filteredPlayers).toEqual([mockPlayers[0], mockPlayers[1],]);
});

it('should return the RBs', () => {
  mockFilters.set('position', 'RB');
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(3);
  expect(filteredPlayers).toEqual([mockPlayers[2], mockPlayers[3], mockPlayers[4],]);
});

it('should return the WRs', () => {
  mockFilters.set('position', 'WR');
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(3);
  expect(filteredPlayers).toEqual([mockPlayers[5], mockPlayers[6], mockPlayers[7],]);
});

it('should return the TEs', () => {
  mockFilters.set('position', 'TE');
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(3);
  expect(filteredPlayers).toEqual([mockPlayers[8], mockPlayers[9], mockPlayers[10],]);
});

it('should return the DEFs', () => {
  mockFilters.set('position', 'DEF');
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(3);
  expect(filteredPlayers).toEqual([mockPlayers[11], mockPlayers[12], mockPlayers[13],]);
});

it('should return the Ks', () => {
  mockFilters.set('position', 'K');
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(3);
  expect(filteredPlayers).toEqual([mockPlayers[14], mockPlayers[15], mockPlayers[16],]);
});

it('should return all PICKED players', () => {
  mockFilters.set('picked', true);
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(6);
  expect(filteredPlayers).toEqual([
    mockPlayers[0],
    mockPlayers[2],
    mockPlayers[5],
    mockPlayers[8],
    mockPlayers[11],
    mockPlayers[14],
  ]);
});

it('should return all UNPICKED players', () => {
  mockFilters.set('picked', false);
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(11);
  expect(filteredPlayers).toEqual([
    mockPlayers[1], mockPlayers[3], mockPlayers[4], mockPlayers[6],
    mockPlayers[7], mockPlayers[9], mockPlayers[10], mockPlayers[12],
    mockPlayers[13], mockPlayers[15], mockPlayers[16],
  ]);
});

it('should return all FAVED players', () => {
  mockFilters.set('faved', true);
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(6);
  expect(filteredPlayers).toEqual([
    mockPlayers[0], mockPlayers[2], mockPlayers[5], mockPlayers[8],
    mockPlayers[11], mockPlayers[14],
  ]);
});

it('should return all UNFAVED players', () => {
  mockFilters.set('faved', false);
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(11);
  expect(filteredPlayers).toEqual([
    mockPlayers[1], mockPlayers[3], mockPlayers[4], mockPlayers[6],
    mockPlayers[7], mockPlayers[9], mockPlayers[10], mockPlayers[12],
    mockPlayers[13], mockPlayers[15], mockPlayers[16],
  ]);
});

it('should return the PICKED WRs', () => {
  mockFilters.set('picked', true).set('position', 'WR');
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(1);
  expect(filteredPlayers).toEqual([mockPlayers[5],]);
});

it('should return the UNPICKED TEs', () => {
  mockFilters.set('picked', false).set('position', 'TE');
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(2);
  expect(filteredPlayers).toEqual([mockPlayers[9], mockPlayers[10],]);
});

it('should return the FAVED QBs', () => {
  mockFilters.set('position', 'QB').set('faved', true);
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(1);
  expect(filteredPlayers).toEqual([mockPlayers[0],]);
});

it('should return the UNFAVED RBs', () => {
  mockFilters.set('faved', false).set('position', 'RB');
  const filteredPlayers = FilterService.filterPlayers(players, mockFilters);
  expect(filteredPlayers.length).toEqual(2);
  expect(filteredPlayers).toEqual([mockPlayers[3], mockPlayers[4],]);
});
