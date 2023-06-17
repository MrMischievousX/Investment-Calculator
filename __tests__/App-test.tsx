/**
 * @format
 */

import 'react-native';
import App, {Main} from '../App';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {fetchPools, fetchPoolCalculator} from '../src/utils/api';
import {
  memoInvestmemtResponseData,
  memoPoolData,
} from '../src/constants/helper';
import React from 'react';

jest.mock('../src/utils/api', () => {
  return {
    fetchPools: jest.fn(() => []),
    fetchPoolCalculator: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe('Testing App component', () => {
  it('renders correctly', () => {
    const render = renderer.create(<App />);
  });
});

describe('Loader present at start', () => {
  it('renders correctly', () => {
    const root = renderer.create(<Main />).root;
    const loader = root.findByProps({testID: 'mainLoader'});
    expect(loader).toBeTruthy();
  });
});

describe('Loader Disappear after state change', () => {
  const useStateSpy = jest.spyOn(React, 'useState');
  const mockSetState = jest.fn();

  useStateSpy
    .mockImplementationOnce(() => [memoPoolData, mockSetState])
    .mockImplementationOnce(() => [7000, () => mockSetState])
    .mockImplementationOnce(() => [3, mockSetState])
    .mockImplementationOnce(() => [1, mockSetState])
    .mockImplementationOnce(() => [0, mockSetState])
    .mockImplementationOnce(() => [memoInvestmemtResponseData, mockSetState])
    .mockImplementation((x: any) => [x, mockSetState]);

  const render = renderer.create(<Main />);
  const root = render.root;

  const mainView = root.findByProps({testID: 'mainView'});
  expect(mainView).toBeTruthy();

  const amountInput = root.findByProps({testID: 'amountInput'});
  expect(amountInput).toBeTruthy();
  expect(amountInput.props.value).toEqual('7000');

  act(() => amountInput.props.onChangeText());

  const investedIn = root.findByProps({testID: 'investedIn'});
  expect(investedIn).toBeTruthy();
  expect(investedIn.props.children).toEqual('BTC ETH Ratio Fund');

  const mainYears = root.findByProps({testID: 'mainYears'});
  expect(mainYears).toBeTruthy();
  expect(mainYears.props.children).toEqual([3, ' yrs']);

  const investmentValue = root.findByProps({testID: 'investmentValue'});
  expect(investmentValue).toBeTruthy();
  expect(investmentValue.props.children).toEqual(
    `${~~memoInvestmemtResponseData.resultData.investedAmountInUSD} USDT`,
  );

  const investmentWorth = root.findByProps({testID: 'investmentWorth'});
  expect(investmentWorth).toBeTruthy();
  expect(investmentWorth.props.children).toEqual(
    `${~~(
      memoInvestmemtResponseData.resultData.worthNowInUSD /
      (10 ^ 18)
    )} USDT`,
  );

  const investmentChange = root.findByProps({testID: 'investmentChange'});
  expect(investmentChange).toBeTruthy();
  expect(investmentChange.props.children).toEqual(
    `${~~memoInvestmemtResponseData.absoluteReturns} %`,
  );
});
