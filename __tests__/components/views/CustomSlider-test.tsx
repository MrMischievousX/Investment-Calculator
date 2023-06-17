/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.

import renderer, {act} from 'react-test-renderer';
import CustomSlider from '../../../src/components/views/CustomSlider';
import {simplifyAmount, simplifyYears} from '../../../src/utils/helper';

const props = {
  amount: 7000,
  setAmount: jest.fn(),
  disabled: false,
};

jest.mock('../../../src/utils/helper', () => {
  return {simplifyAmount: jest.fn(), simplifyYears: jest.fn()};
});

describe('Testing CustomSlider Component for amount', () => {
  it('Should render CustomSlider with amount', () => {
    const root = renderer.create(<CustomSlider {...props} type="amount" />);
    expect(simplifyAmount).toBeCalledTimes(3);
  });

  it('Should call update function', () => {
    const root = renderer.create(
      <CustomSlider {...props} type="amount" />,
    ).root;

    const sliderView = root.findByProps({
      testID: 'slider',
    });

    act(() => sliderView.props.onChange());

    expect(props.setAmount).toHaveBeenCalled();
  });
});

describe('Testing CustomSlider Component for years', () => {
  it('Should render CustomSlider with years', () => {
    const root = renderer.create(<CustomSlider {...props} type="years" />);
    expect(simplifyYears).toBeCalledTimes(3);
  });

  it('Should be enabled on false disabled prop', () => {
    const root = renderer.create(<CustomSlider {...props} type="years" />).root;

    const sliderView = root.findByProps({
      testID: 'slider',
    });

    expect(sliderView.props.editable).toEqual(false);
  });

  it('Should be disabled on true disabled prop', () => {
    const root = renderer.create(
      <CustomSlider {...props} disabled={true} type="years" />,
    ).root;

    const sliderView = root.findByProps({
      testID: 'slider',
    });

    expect(sliderView.props.editable).toEqual(true);
  });
});
