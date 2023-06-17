/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import SubmitBtn from '../../../src/components/buttons/SubmitBtn';
import {Platform} from 'react-native';

const props = {
  title: 'Calculate',
  fetchInvestmentCalculator: jest.fn(),
  loading: false,
  inset: {top: 0, right: 0, bottom: 0, left: 0},
};

jest.clearAllMocks();
jest.clearAllTimers();

describe('Testing SubmitBtn Component', () => {
  it('Should render SubmitBtn', () => {
    const root = renderer.create(<SubmitBtn {...props} />);
  });

  it('Should render SubmitBtn with different inset', () => {
    const root = renderer.create(
      <SubmitBtn {...props} inset={{top: 0, right: 0, bottom: 32, left: 0}} />,
    );
  });

  it('Should render SubmitBtn with different inset and android os', () => {
    Platform.OS = 'android';
    const root = renderer.create(
      <SubmitBtn {...props} inset={{top: 0, right: 0, bottom: 32, left: 0}} />,
    );
  });

  it('Should render correct title', () => {
    const root = renderer.create(<SubmitBtn {...props} />).root;

    const textProps = root.findByProps({
      testID: 'submitBtnTitle',
    }).props;
    expect(textProps.children).toEqual('Calculate');
  });

  it('Should not show loader when not loading', () => {
    const root = renderer.create(<SubmitBtn {...props} />).root;
    const loader = root.findAllByProps({
      testID: 'submitBtnLoader',
    });
    expect(loader.length).toEqual(0);
  });

  it('Should show loader when loading', () => {
    const root = renderer.create(<SubmitBtn {...props} loading={true} />).root;
    const loader = root.findByProps({
      testID: 'submitBtnLoader',
    });
    expect(loader).toBeTruthy();
  });

  it('Should invoke fetchInvestmentCalculator function', () => {
    const root = renderer.create(<SubmitBtn {...props} />).root;

    const btn = root.findByProps({
      testID: 'submitBtnAction',
    }).props;

    act(() => btn.onPress());

    expect(props.fetchInvestmentCalculator).toHaveBeenCalledTimes(1);
  });

  it('Should show loader when clicked', () => {
    const component = renderer.create(<SubmitBtn {...props} />);

    const root = component.root;

    const oldLoader = root.findAllByProps({
      testID: 'submitBtnLoader',
    });
    expect(oldLoader.length).toEqual(0);

    const btn = root.findByProps({
      testID: 'submitBtnAction',
    }).props;
    act(() => btn.onPress());

    component.update(<SubmitBtn {...props} loading={true} />);

    const newLoader = root.findAllByProps({
      testID: 'submitBtnLoader',
    });
    expect(newLoader.length).not.toEqual(0)!;
  });
});
