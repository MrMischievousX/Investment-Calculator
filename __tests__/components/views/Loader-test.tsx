/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Loader from '../../../src/components/views/Loader';

describe('Testing Main Loader Component', () => {
  it('Should render Loader', () => {
    renderer.create(<Loader />);
  });
});
