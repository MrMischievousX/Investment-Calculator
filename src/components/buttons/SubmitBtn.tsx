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
