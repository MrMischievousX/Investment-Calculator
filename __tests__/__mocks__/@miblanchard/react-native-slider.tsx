import React, {Fragment} from 'react';
import {TextInput} from 'react-native-gesture-handler';

interface Props {
  disabled: boolean;
  onValueChange: Function;
  renderTrackMarkComponent: any;
}

const Slider = ({disabled, onValueChange, renderTrackMarkComponent}: Props) => {
  return (
    <>
      <TextInput
        testID="slider"
        editable={disabled}
        onChange={() => onValueChange([0])}
      />
      {renderTrackMarkComponent()}
    </>
  );
};

export {Slider};
