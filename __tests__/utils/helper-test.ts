/**
 * @format
 */

import {Platform} from 'react-native';
import {
  guidelineBaseWidthAndroid,
  isSmallDevice,
  scale,
} from '../../src/constants/dimen';
import {
  investmentCountCalculator,
  simplifyAmount,
  simplifyYears,
} from '../../src/utils/helper';

describe('Testing simplifyAmount function', () => {
  it('Should return correct value', () => {
    expect(simplifyAmount(1)).toEqual('1');
    expect(simplifyAmount(10)).toEqual('10');
    expect(simplifyAmount(100)).toEqual('100');
    expect(simplifyAmount(1000)).toEqual('1K');
    expect(simplifyAmount(10000)).toEqual('10K');
    expect(simplifyAmount(100000)).toEqual('100K');
    expect(simplifyAmount(1000000)).toEqual('1M');
    expect(simplifyAmount(10000000)).toEqual('10M');
    expect(simplifyAmount(100000000)).toEqual('100M');
    expect(simplifyAmount(1000000000)).toEqual('1B');
    expect(simplifyAmount(10000000000)).toEqual('10B');
    expect(simplifyAmount(100000000000)).toEqual('100B');
    expect(simplifyAmount(1000000000000)).toEqual('1T');
    expect(simplifyAmount(10000000000000)).toEqual('10T');
  });
});

describe('Testing simplifyYears function', () => {
  it('Should return correct value', () => {
    expect(simplifyYears(1)).toEqual('1 yrs');
    expect(simplifyYears(1.2)).toEqual('1 yrs');
    expect(simplifyYears(1.8)).toEqual('2 yrs');
  });
});

describe('Testing investmentCountCalculator function', () => {
  it('Should return correct value', () => {
    expect(investmentCountCalculator(2, 0)).toEqual(104);
    expect(investmentCountCalculator(2, 1)).toEqual(24);
    expect(investmentCountCalculator(2, 2)).toEqual(2);
  });
});

describe('Testing scale function', () => {
  it('Should give resized values', () => {
    expect(scale(10)).toEqual(20);
    Platform.OS = 'android';
    expect(scale(10)).toEqual(20);
  });

  it('Should return device size', () => {
    expect(isSmallDevice).toEqual(false);
    expect(guidelineBaseWidthAndroid).toEqual(380);
  });
});
