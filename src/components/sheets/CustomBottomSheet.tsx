import {View, Text, Image, StyleSheet} from 'react-native';
import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {COLORS} from '../../constants/colors';
import {height, scale, width} from '../../constants/dimen';
import {FONTS} from '../../constants/fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {memoPoolData, timeLineArr} from '../../constants/helper';

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
    () => (sheetState === 'timeline' ? ['20%'] : ['75%']),
    [sheetState],
  );

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const pools = data;

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <TouchableOpacity
        onPress={() => {
          setPoolIndex(index);
          bottomSheetRef?.current?.close();
        }}>
        <View
          style={{
            marginVertical: scale(16),
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={{
              uri: item.poolImage,
            }}
            style={{
              width: scale(48),
              height: scale(48),
              borderRadius: scale(8),
            }}
          />
          <Text
            style={{
              ...FONTS.sheetText,
              marginLeft: scale(16),
              width: width * 0.7,
            }}>
            {item.poolName}
          </Text>
        </View>
      </TouchableOpacity>
    ),
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
      <View
        style={{
          backgroundColor: COLORS.primaryBg,
          width: '100%',
          height: '100%',
          paddingVertical: scale(16),
          paddingHorizontal: scale(12),
          borderRadius: scale(24),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {sheetState === 'timeline' ? (
          <View
            style={{
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '96%',
            }}>
            {timeLineArr.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      index == timeline
                        ? COLORS.primaryCta
                        : COLORS.secondaryBg,
                    paddingHorizontal: scale(12),
                    paddingVertical: scale(8),
                    borderRadius: scale(8),
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
          <BottomSheetFlatList
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
