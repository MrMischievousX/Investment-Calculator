import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {navbarHeight, scale, width} from '../../constants/dimen';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';

/**
 * Submit button component.
 * Renders a button with provided title, handles loading state, and calls the given function on button press.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Button title.
 * @param {Function} props.fetchInvestmentCalculator - Function to be called on button press.
 * @param {boolean} props.loading - Indicates if API call is in progress.
 * @param {Object} props.inset - Safe area insets.
 * @param {number} props.inset.top - Top inset.
 * @param {number} props.inset.right - Right inset.
 * @param {number} props.inset.bottom - Bottom inset.
 * @param {number} props.inset.left - Left inset.
 * @returns {JSX.Element} - Submit button component.
 */

type Props = {
  title: string;
  fetchInvestmentCalculator: Function;
  loading: boolean;
  inset: {top: number; right: number; bottom: number; left: number};
};

const SubmitBtn = ({
  title,
  loading,
  inset,
  fetchInvestmentCalculator,
}: Props) => {
  return (
    <View
      testID="submitBtnView"
      style={{
        ...styles.container,
        bottom: inset.bottom
          ? inset.bottom + scale(8)
          : Platform.OS == 'ios'
          ? scale(navbarHeight) + scale(8)
          : scale(navbarHeight) + scale(36),
      }}>
      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        testID="submitBtnAction"
        onPress={() => fetchInvestmentCalculator()}>
        {loading ? (
          <ActivityIndicator
            testID="submitBtnLoader"
            color={COLORS.primaryBg}
            size={'large'}
          />
        ) : (
          <Text testID="submitBtnTitle" style={{...FONTS.ctaText}}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: scale(56),
    backgroundColor: COLORS.primaryCta,
    borderRadius: scale(16),
    marginBottom: scale(8),
    marginHorizontal: width * 0.05,
    position: 'absolute',
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(SubmitBtn);
