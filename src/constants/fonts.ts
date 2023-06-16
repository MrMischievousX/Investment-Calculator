import {PixelRatio, Platform, StyleSheet} from 'react-native';
import {scale, width} from './dimen';
import {COLORS} from './colors';

// const normalize = (size: number): number => {
//   const scale = width / 700;
//   const newSize = size * scale;
//   let calculatedSize = Math.round(PixelRatio.roundToNearestPixel(newSize));

//   // if (PixelRatio.get() < 3) return calculatedSize - 0.5;
//   return calculatedSize;
// };

const fonts = StyleSheet.create({
  primaryHeading: {
    fontSize: scale(20),
    includeFontPadding: false,
    fontWeight: '700',
    color: COLORS.secondaryText,
  },
  primaryText: {
    fontSize: scale(18),
    includeFontPadding: false,
    fontWeight: '500',
    color: COLORS.primaryText,
  },
  secondaryText: {
    fontSize: scale(15),
    includeFontPadding: false,
    fontWeight: '600',
    color: COLORS.secondaryText,
    opacity: 0.9,
  },
  headingText: {
    fontSize: scale(28),
    includeFontPadding: false,
    fontWeight: '700',
    color: COLORS.success,
  },
  subHeadingText: {
    fontSize: scale(18),
    includeFontPadding: false,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  tertiaryText: {
    fontSize: scale(14),
    includeFontPadding: false,
    fontWeight: '500',
    color: COLORS.success,
  },
  ctaText: {
    fontSize: scale(18),
    includeFontPadding: false,
    fontWeight: '500',
    color: COLORS.primaryBg,
    letterSpacing: 1,
  },
  sheetText: {
    fontSize: scale(20),
    includeFontPadding: false,
    fontWeight: '500',
    color: COLORS.black,
    letterSpacing: 1,
  },
  errorText: {
    fontSize: scale(12),
    includeFontPadding: false,
    fontWeight: '500',
    color: COLORS.red,
    marginTop: scale(2),
  },
});

export const FONTS = fonts;
