/**
 * @format
 */

import {
  fetchInvestment,
  fetchPoolCalculator,
  fetchPools,
} from '../../src/utils/api';

describe('Testing Successful apis', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
      }),
    );
    global.Headers = () => ({
      append: jest.fn(),
    });
  });

  it('fetchPools api', async () => {
    const value = await fetchPools();
  });

  it('fetchInvestment api', async () => {
    const value = await fetchInvestment(11, 30, 24, 7000);
  });

  it('fetchPoolCalculator api', async () => {
    const value = await fetchPoolCalculator(11);
  });
});

describe('Testing Unsuccessful apis', () => {
  beforeEach(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => {
          return null;
        },
      });
    global.Headers = () => ({
      append: jest.fn(),
    });
  });

  it('fetchPools api', async () => {
    const value = await fetchPools();
    expect(value).toBeFalsy();
  });

  it('fetchInvestment api', async () => {
    const value = await fetchInvestment(11, 30, 24, 7000);
    expect(value).toBeFalsy();
  });

  it('fetchPoolCalculator api', async () => {
    const value = await fetchPoolCalculator(11);
    expect(value).toBeFalsy();
  });
});
