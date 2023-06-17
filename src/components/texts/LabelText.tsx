import {Text} from 'react-native';
import React, {memo} from 'react';
import {FONTS} from '../../constants/fonts';

type Props = {title: string};

const LabelText = ({title}: Props) => {
  return (
    <Text testID="labeltitle" style={{...FONTS.primaryText}}>
      {title}
    </Text>
  );
};

export default memo(LabelText);
