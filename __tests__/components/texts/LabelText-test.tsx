/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import LabelText from '../../../src/components/texts/LabelText';

describe('Testing labelText Component', () => {
  it('Should render LabelText', () => {
    renderer.create(<LabelText title="Nord Finance" />);
  });

  it('Should render correct title', () => {
    const root = renderer.create(<LabelText title="Nord Finance" />).root;
    const textProps = root.findByProps({testID: 'labeltitle'}).props;
    expect(textProps.children).toEqual('Nord Finance');
  });
});
