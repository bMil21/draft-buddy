import React from 'react';
import pickCalculator from './pick-calculator';

interface PickCalculatorType {
  getMyPicks: (myPick: number, teams: number, rounds: number, snake: boolean) => number[];
  getPicksForSnake: (myPick: number, teams: number, rounds: number) => number[];
  getPicksForRegular: (myPick: number, teams: number, rounds: number) => number[];
}

// let pickCalculator: PickCalculatorType;

beforeEach(() => {
  // pickCalculator = PickCalculator;
});

// Get My Picks

it('should get picks for snake draft', () => {
  jest.spyOn(pickCalculator, 'getPicksForSnake');
  pickCalculator.getMyPicks(7, 8, 16, true);
  expect(pickCalculator.getPicksForSnake).toHaveBeenCalledWith(7, 8, 16, true);
});

it('should get picks for regular draft', () => {
  //
});

// Get Picks for Snake

// Get Picks for Regular
