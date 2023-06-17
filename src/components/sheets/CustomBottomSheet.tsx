import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React, {memo, useCallback, useMemo} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {COLORS} from '../../constants/colors';
import {navbarHeight, scale, width} from '../../constants/dimen';
import {FONTS} from '../../constants/fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {timeLineArr} from '../../constants/helper';

/**
 * Custom Bottom Sheet component.
 * Renders a customizable bottom sheet with different content based on the sheet state.
 *
 * @param {Object} props - Component props.
 * @param {any} props.data - Data for rendering the bottom sheet.
 * @param {string} props.sheetState - Current state of the bottom sheet.
 * @param {Function} props.setPoolIndex - Function to set the pool index.
 * @param {Function} props.setTimeline - Function to set the timeline.
 * @param {React.RefObject} props.bottomSheetRef - Reference to the bottom sheet.
 * @param {number} props.timeline - Current timeline value.
 * @returns {JSX.Element} - Custom Bottom Sheet component.
 */

interface Props {
  data: any;
  sheetState: string;
  setPoolIndex: Function;
  setTimeline: Function;
  bottomSheetRef: React.RefObject<any>;
  timeline: number;
}

const CustomBottomSheet = ({
  setPoolIndex,
  setTimeline,
  sheetState,
  bottomSheetRef,
  timeline,
  data,
}: Props) => {
  const snapPoints = useMemo(
    () =>
      sheetState === 'timeline' ? [navbarHeight ? '15%' : '15%'] : ['75%'],
    [sheetState],
  );

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const pools = data;

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <TouchableOpacity
          testID={`amountBottomSheetItem${index}`}
          onPress={() => {
            setPoolIndex(index);
            bottomSheetRef?.current?.close();
          }}>
          <View style={styles.flatitem}>
            <Image
              source={{
                uri: item.poolImage,
              }}
              style={styles.flatImg}
            />
            <Text style={styles.timelineText}>{item.poolName}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      index={-1}
      backdropComponent={backdropProps => (
        <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} />
      )}
      backgroundStyle={{backgroundColor: COLORS.primaryBg}}
      onChange={handleSheetChanges}>
      <View style={styles.sheetContainer}>
        {sheetState === 'timeline' ? (
          <View testID="timelineBottomSheet" style={styles.timelineSheet}>
            {timeLineArr.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  testID={`timelineBottomSheetItem${index}`}
                  style={{
                    ...styles.timelineItem,
                    backgroundColor:
                      index == timeline
                        ? COLORS.primaryCta
                        : COLORS.secondaryBg,
                  }}
                  onPress={() => {
                    setTimeline(index);
                    bottomSheetRef?.current?.close();
                  }}>
                  <Text
                    style={{
                      ...FONTS.secondaryText,
                      color:
                        index == timeline
                          ? COLORS.primaryBg
                          : COLORS.secondaryText,
                    }}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <FlatList
            testID="amountBottomSheet"
            showsVerticalScrollIndicator={false}
            data={pools}
            keyExtractor={(item, index) => index?.toString()}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: scale(40)}}
          />
        )}
      </View>
    </BottomSheet>
  );
};

export default memo(CustomBottomSheet);

const styles = StyleSheet.create({
  flatitem: {
    marginVertical: scale(16),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flatImg: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(8),
  },
  sheetContainer: {
    backgroundColor: COLORS.primaryBg,
    width: '100%',
    height: '100%',
    paddingVertical: scale(16),
    paddingHorizontal: scale(12),
    borderRadius: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(8),
  },
  timelineText: {
    ...FONTS.sheetText,
    marginLeft: scale(16),
    width: width * 0.7,
  },
  timelineSheet: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
  },
});
