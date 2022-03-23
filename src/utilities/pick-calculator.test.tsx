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
});


it('should get picks for regular draft', () => {
  //
});


// Get Picks for Snake

// Get Picks for Regular
