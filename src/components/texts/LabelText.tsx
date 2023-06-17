import {Text} from 'react-native';
import React, {memo} from 'react';
import {FONTS} from '../../constants/fonts';

/**
 * Label Text component.
 * Renders a customizable text label.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Title to be displayed.
 * @returns {JSX.Element} - Label Text component.
 */

type Props = {title: string};

const LabelText = ({title}: Props) => {
  return (
    <Text testID="labeltitle" style={{...FONTS.primaryText}}>
      {title}
    </Text>
  );
};

export default memo(LabelText);
