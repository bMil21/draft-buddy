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

// Get Picks for Regular
