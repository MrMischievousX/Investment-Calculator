import {View} from 'react-native';

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0};
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({children}) => children),
    SafeAreaConsumer: jest
      .fn()
      .mockImplementation(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});

jest.mock('react-native-gesture-handler', () => {
  const {TouchableOpacity, ScrollView, TextInput} =
    jest.requireActual('react-native');
  const View = require('react-native/Libraries/Components/View/View');
  return {
    GestureHandlerRootView: View,
    TouchableOpacity,
    ScrollView,
    TextInput,
  };
});

jest.mock('@gorhom/bottom-sheet', () => {
  return {
    __esModule: true,
    ...require('@gorhom/bottom-sheet/mock'),
  };
});
