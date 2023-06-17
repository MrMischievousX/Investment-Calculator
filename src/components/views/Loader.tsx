import {StyleSheet, View} from 'react-native';
import React from 'react';
import {height, width} from '../../constants/dimen';
import {COLORS} from '../../constants/colors';
import {NordLogo} from '../../assets/svgs';

/**
 * Loader component.
 * Renders a loading screen with a logo.
 *
 * @param {Object} props - Component props.
 * @returns {JSX.Element} - Loader component.
 */

type Props = {};

const Loader = (props: Props) => {
  return (
    <View testID="mainLoader" style={styles.container}>
      <NordLogo width={width * 0.8} style={{objectFit: 'contain'}} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: COLORS.primaryBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.6,
    backgroundColor: 'red',
  },
});
