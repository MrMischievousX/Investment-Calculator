import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const isSmallDevice = width <= 375 && height <= 667 ? true : false;
const navbarHeight = height - windowHeight - StatusBar?.currentHeight ?? 0;

const guidelineBaseWidth = 380;
const guidelineBaseHeight = 680;
export const guidelineBaseWidthAndroid = width <= 375 ? 400 : 380;

/**
 * scale
 * Convert size to device specific size
 *
 * @param  {number} size Enter size
 */
const scale = (size: number) => {
  let dim;
  if (Platform.OS === 'android') {
    dim = (width / guidelineBaseWidthAndroid) * size;
  } else {
    dim = (width / guidelineBaseWidth) * size;
  }

  dim = Math.round(PixelRatio.roundToNearestPixel(dim));

  if (isSmallDevice) return dim * 0.92;
  return dim;
};

export {scale, width, height, navbarHeight};
