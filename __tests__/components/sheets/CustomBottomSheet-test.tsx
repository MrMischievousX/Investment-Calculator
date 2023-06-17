/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {memoPoolData} from '../../../src/constants/helper';
import CustomBottomSheet from '../../../src/components/sheets/CustomBottomSheet';

const props = {
  data: memoPoolData,
  sheetState: 'amount',
  setPoolIndex: jest.fn(),
  setTimeline: jest.fn(),
  bottomSheetRef: React.createRef(),
  timeline: 1,
};

describe('Testing BottomSheet Component', () => {
  it('Should render BottomSheet', () => {
    renderer.create(<CustomBottomSheet {...props} />);
  });

  it('Should render AmountBottomSheet for amount state', () => {
    const root = renderer.create(
      <CustomBottomSheet {...props} sheetState={'amount'} />,
    ).root;
    const amountView = root.findByProps({
      testID: 'amountBottomSheet',
    });
    expect(amountView).toBeTruthy();
  });

  it('Should render TimelineBottomSheet for timeline state', () => {
    const root = renderer.create(
      <CustomBottomSheet {...props} sheetState={'timeline'} />,
    ).root;
    const timelineView = root.findByProps({
      testID: 'timelineBottomSheet',
    });
    expect(timelineView).toBeTruthy();
  });

  it('Should call setPoolIndex on click in amount state', () => {
    const root = renderer.create(
      <CustomBottomSheet {...props} sheetState={'amount'} />,
    ).root;
    const amountView = root.findByProps({
      testID: 'amountBottomSheetItem0',
    });
    act(() => amountView.props.onPress());
    expect(props.setPoolIndex).toHaveBeenCalledTimes(1);
  });

  it('Should call setTimeline on click in timeline state', () => {
    const root = renderer.create(
      <CustomBottomSheet {...props} sheetState={'timeline'} />,
    ).root;
    const timelineView = root.findByProps({
      testID: 'timelineBottomSheetItem0',
    });
    act(() => timelineView.props.onPress());
    expect(props.setTimeline).toHaveBeenCalledTimes(1);
  });
});
