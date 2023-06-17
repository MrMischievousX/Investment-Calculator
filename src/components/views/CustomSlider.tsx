import {StyleSheet, Text, View} from 'react-native';
import {isSmallDevice, scale} from '../../constants/dimen';
import {FONTS} from '../../constants/fonts';
import {COLORS} from '../../constants/colors';
import {simplifyAmount, simplifyYears} from '../../utils/helper';
import {memo, useEffect, useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';

/**
 * Custom Slider component.
 * Renders a customized slider component.
 *
 * @param {Object} props - Component props.
 * @param {number} [props.amount] - Current value of the slider.
 * @param {Function} props.setAmount - Function to set the slider value.
 * @param {string} props.type - Type of the slider ('amount' or 'years').
 * @param {boolean} props.disabled - Indicates if the slider is disabled.
 * @returns {JSX.Element} - Customized Slider component.
 */

interface Props extends React.HTMLAttributes<any> {
  amount?: number;
  setAmount: (value: number) => void;
  type: 'amount' | 'years';
  disabled: boolean;
}

const CustomSlider = ({amount, type, setAmount, disabled}: Props) => {
  const range = type == 'amount' ? {start: 0, end: 21000} : {start: 1, end: 10};
  const [trackRange, setTrackRange] = useState<number[]>([]);

  useEffect(() => {
    // Calcuate the tracks
    const temp: number[] = [];
    const step = (range.end - range.start) / 5;
    for (let i = range.start + step; i < range.end; i += step) temp.push(i);

    setTrackRange(temp);
  }, []);

  return (
    <View style={styles.main}>
      <Slider
        disabled={disabled}
        value={amount}
        containerStyle={{
          width: '100%',
        }}
        thumbTintColor={COLORS.primarySlider}
        minimumTrackTintColor={COLORS.primarySlider}
        maximumTrackTintColor={COLORS.secondarySlider}
        onValueChange={(value: number[]) => setAmount(value[0])}
        minimumValue={range.start}
        maximumValue={range.end}
        trackClickable
        step={1}
        animateTransitions
        trackMarks={trackRange}
        renderTrackMarkComponent={index => {
          return (
            <Text
              style={{
                ...FONTS.secondaryText,
                top: scale(24),
                transform: [{translateX: -scale(8)}],
              }}>
              {type == 'amount'
                ? simplifyAmount(trackRange[index])
                : simplifyYears(trackRange[index])}
            </Text>
          );
        }}
      />
      <View style={styles.textContainer}>
        <Text style={{...FONTS.secondaryText}}>
          {type == 'amount'
            ? simplifyAmount(range.start)
            : simplifyYears(range.start)}
        </Text>
        <Text style={{...FONTS.secondaryText}}>
          {type == 'amount'
            ? simplifyAmount(range.end)
            : simplifyYears(range.end)}
        </Text>
      </View>
    </View>
  );
};

export default memo(CustomSlider);

const styles = StyleSheet.create({
  main: {
    width: '100%',
    marginVertical: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    top: -scale(isSmallDevice ? 7 : 4),
  },
});
