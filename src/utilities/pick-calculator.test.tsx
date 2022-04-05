import React from 'react';
import pickCalculator from './pick-calculator';

beforeEach(() => {
  // 
});

// Get My Picks

it('should get picks for snake draft', () => {
  const snakeSpy = jest.spyOn(pickCalculator, 'getPicksForSnake');
  const regSpy = jest.spyOn(pickCalculator, 'getPicksForRegular');

  pickCalculator.getMyPicks(7, 8, 16, true);

  expect(snakeSpy).toHaveBeenCalledWith(7, 8, 16);
  expect(regSpy).not.toHaveBeenCalled();
  snakeSpy.mockRestore();
  regSpy.mockRestore();
});

it('should get picks for regular draft', () => {
  const snakeSpy = jest.spyOn(pickCalculator, 'getPicksForSnake');
  const regSpy = jest.spyOn(pickCalculator, 'getPicksForRegular');

  pickCalculator.getMyPicks(4, 6, 14, false);

  expect(snakeSpy).not.toHaveBeenCalled();
  expect(regSpy).toHaveBeenCalledWith(4, 6, 14);
  snakeSpy.mockRestore();
  regSpy.mockRestore();
});

// Get Picks for Snake

it('should return SNAKE draft picks', () => {
  const expectedOutput = [7, 22, 35, 50, 63, 78, 91, 106, 119, 134, 147, 162, 175, 190, 203, 218,];
  const picks = pickCalculator.getPicksForSnake(7, 14, 16);
  expect(picks).toEqual(expectedOutput);
});

it('should return SNAKE draft picks (2nd pick, 8 teams, 10 rounds)', () => {
  const expectedOutput = [2, 15, 18, 31, 34, 47, 50, 63, 66, 79,];
  const picks = pickCalculator.getPicksForSnake(2, 8, 10);
  expect(picks).toEqual(expectedOutput);
});

// Get Picks for Regular

it('should return REGULAR draft picks', () => {
  const expectedOutput = [7, 21, 35, 49, 63, 77, 91, 105, 119, 133, 147, 161, 175, 189, 203, 217,];
  const picks = pickCalculator.getPicksForRegular(7, 14, 16);
  expect(picks).toEqual(expectedOutput);
});

it('should return REGULAR draft picks (2nd pick, 14 teams, 8 rounds)', () => {
  const expectedOutput = [2, 16, 30, 44, 58, 72, 86, 100,];
  const picks = pickCalculator.getPicksForRegular(2, 14, 8);
  expect(picks).toEqual(expectedOutput);
});
