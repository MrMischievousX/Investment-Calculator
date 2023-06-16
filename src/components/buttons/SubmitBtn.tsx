import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {navbarHeight, scale, width} from '../../constants/dimen';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  title: string;
  fetchInvestmentCalculator: Function;
  loading: boolean;
};

const SubmitBtn = ({title, fetchInvestmentCalculator, loading}: Props) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.container,
        bottom: inset.bottom
          ? inset.bottom + scale(8)
          : scale(navbarHeight) + scale(32),
      }}>
      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={() => fetchInvestmentCalculator()}>
        {loading ? (
          <ActivityIndicator color={COLORS.primaryBg} size={'large'} />
        ) : (
          <Text style={{...FONTS.ctaText}}>{title}</Text>
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
