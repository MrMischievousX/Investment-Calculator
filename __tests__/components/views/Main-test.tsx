/**
 * @format
 */

import 'react-native';
import React, {useEffect} from 'react';
import App, {Main} from '../../../App';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {fetchPools, fetchPoolCalculator} from '../../../src/utils/api';

jest.mock('../../../src/utils/api', () => {
  return {
    fetchPools: jest.fn(() => []),
    fetchPoolCalculator: jest.fn(),
  };
});

describe('Functions getting called', () => {
  const useEffectMock = jest.spyOn(React, 'useEffect');

  it('invoke function', () => {
    const render = renderer.create(<Main />);
    const root = render.root;
    act(() => {
      useEffectMock.mock.calls[0][0]();
    });

    expect(fetchPools).toHaveBeenCalled();
  });
});
