import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {width, height, scale} from './src/constants/dimen';
import {FONTS} from './src/constants/fonts';
import {COLORS} from './src/constants/colors';
import CustomSlider from './src/components/views/CustomSlider';
import LabelText from './src/components/texts/LabelText';
import SubmitBtn from './src/components/buttons/SubmitBtn';
import {
  fetchInvestment,
  fetchPoolCalculator,
  fetchPools,
} from './src/utils/api';
import CustomBottomSheet from './src/components/sheets/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {memoPoolData, timeLineArr} from './src/constants/helper';
import {investmentCountCalculator} from './src/utils/helper';
import {LOCALES} from './src/constants/locales';
import Loader from './src/components/views/Loader';
import {ArrowDown} from './src/assets/svgs';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function Main(): JSX.Element {
  const [poolData, setpoolData] = React.useState<any>(null);
  const [amount, setAmount] = React.useState<number>(7000);
  const [years, setYears] = React.useState<number>(3);
  const [timeline, setTimeline] = React.useState<number>(1);
  const [poolIndex, setPoolIndex] = React.useState(-1);
  const [investmentResult, setInvestmentResult] = React.useState<any>(null);
  const [sheetState, setSheetState] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const inset = useSafeAreaInsets();
  const memoInset = useMemo(() => inset, []);

  const getPools = async () => {
    const poolDataRes = await fetchPools();
    if (!poolDataRes || poolDataRes.length <= 0) return;
    const calculatorQuery = await poolDataRes?.pools?.map(async (pool: any) => {
      return fetchPoolCalculator(pool?.id);
    });
    const calculatorData = await Promise.all(calculatorQuery);
    const newPoolData = poolDataRes?.pools?.map((pool: any, index: number) => {
      return {
        id: pool?.id,
        poolName: pool?.poolName,
        poolImage: pool?.poolImage,
        yearlyOptions: calculatorData[index]?.data?.yearlyOptions,
      };
    });

    setpoolData(newPoolData);
  };

  const fetchInvestmentCalculator = useCallback(async () => {
    if (poolIndex == -1) return;
    if (!poolData) return;
    if (poolData[poolIndex].yearlyOptions < years) return;

    setLoading(true);
    const frqInDays = timeLineArr[timeline].days;
    const investmentCount = investmentCountCalculator(years, timeline);

    const investmentRes = await fetchInvestment(
      poolData[poolIndex]?.id,
      frqInDays,
      investmentCount,
      amount,
    );

    const tempInvestmentResult = {
      absoluteReturns: investmentRes?.result?.absoluteReturns,
      resultData:
        investmentRes?.result?.resultData[
          investmentRes?.result?.resultData.length - 1
        ],
    };

    setInvestmentResult(tempInvestmentResult);
    setLoading(false);
  }, [poolIndex, poolData, timeline, amount, years]);

  useEffect(() => {
    getPools();
    // setpoolData(memoPoolData);
  }, []);

  //MEMOIZED FUNCTION FOR SETAMOUNT
  const memoSetAmount = useCallback((value: number) => {
    setAmount(value);
  }, []);

  //MEMOIZED FUNCTION FOR SETYEARS
  const memoSetYears = useCallback((value: number) => {
    setYears(value);
  }, []);

  //MEMOIZED FUNCTION FOR SETPOOLINDEX
  const memoSetPoolIndex = useCallback((value: number) => {
    setPoolIndex(value);
  }, []);

  //MEMOIZED FUNCTION FOR SETTIMELINE
  const memoSetTimeLine = useCallback((value: number) => {
    setTimeline(value);
  }, []);

  if (!poolData) return <Loader />;

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.primaryBg} />
      <SafeAreaView testID="mainView" style={styles.main}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.center}
          style={styles.wrapper}>
          <Text style={{...FONTS.primaryHeading}}>
            {LOCALES.calculateEarnings}
          </Text>
          <View style={styles.container}>
            <LabelText title={LOCALES.investedAmount} />
            <View style={styles.investSubContainer}>
              <View style={styles.investBox}>
                <TextInput
                  testID="amountInput"
                  style={styles.textInput}
                  maxLength={8}
                  allowFontScaling={false}
                  value={isNaN(amount) ? '' : amount.toString()}
                  keyboardType="number-pad"
                  onChangeText={e => {
                    setAmount(parseInt(e));
                  }}
                  editable={!loading}
                  returnKeyType="done"
                />
              </View>
              <View style={{marginLeft: scale(12)}} />
              <View style={styles.investBox}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <Text style={{...FONTS.secondaryText}}>USDT</Text>
                  <ArrowDown
                    width={scale(8)}
                    height={scale(8)}
                    style={{marginLeft: scale(4)}}
                  />
                </View>
              </View>
            </View>
          </View>

          <CustomSlider
            setAmount={memoSetAmount}
            amount={amount}
            type="amount"
            disabled={loading}
          />

          <View style={{...styles.container, marginTop: height * 0.016}}>
            <LabelText title={LOCALES.investedIn} />
            <TouchableOpacity
              disabled={loading}
              activeOpacity={0.8}
              onPress={() => {
                setSheetState('pool');
                Keyboard.dismiss();
                bottomSheetRef?.current?.expand();
              }}>
              <View
                style={{
                  ...styles.investBox,
                  ...styles.poolContainer,
                }}>
                <View style={styles.poolBox}>
                  {poolIndex != -1 && (
                    <Image
                      source={{
                        uri: poolData && poolData[poolIndex]?.poolImage,
                      }}
                      style={styles.image}
                    />
                  )}
                  {poolIndex != -1 && (
                    <Text
                      testID="investedIn"
                      style={{...FONTS.secondaryText, width: '76%'}}>
                      {poolData && poolData[poolIndex]?.poolName}
                    </Text>
                  )}
                </View>
                <ArrowDown
                  width={scale(8)}
                  height={scale(8)}
                  style={{marginLeft: scale(4)}}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <LabelText title={LOCALES.investedTimeline} />
            <TouchableOpacity
              disabled={loading}
              onPress={() => {
                setSheetState('timeline');
                Keyboard.dismiss();
                bottomSheetRef?.current?.expand();
              }}>
              <View
                style={{
                  ...styles.investBox,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...FONTS.secondaryText}}>
                  {timeLineArr[timeline]?.title}
                </Text>
                <ArrowDown
                  width={scale(8)}
                  height={scale(8)}
                  style={{marginLeft: scale(4)}}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View>
              <LabelText title={LOCALES.investedFrom} />
              {poolIndex != -1 &&
                poolData &&
                poolData[poolIndex].yearlyOptions < years && (
                  <Text style={{...FONTS.errorText}}>
                    {LOCALES.noDataAvailable}
                  </Text>
                )}
            </View>
            <View style={{...styles.investBox}}>
              <Text testID="mainYears" style={{...FONTS.secondaryText}}>
                {years} yrs
              </Text>
            </View>
          </View>

          <CustomSlider
            disabled={loading}
            setAmount={memoSetYears}
            amount={years}
            type="years"
          />

          <View style={styles.container}>
            <LabelText title={LOCALES.investedMoney} />
            <Text
              testID="investmentValue"
              style={{...FONTS.subHeadingText, width: '48%'}}>
              {investmentResult
                ? `${investmentResult?.resultData?.investedAmount} USDT`
                : '0 USDT'}
            </Text>
          </View>

          <View style={{...styles.container, alignItems: 'center'}}>
            <LabelText title={LOCALES.moneyYouWouldHave} />
            <View
              style={{
                width: '49%',
              }}>
              <Text style={{...FONTS.headingText}} testID="investmentWorth">
                {investmentResult
                  ? `${~~(
                      investmentResult?.resultData?.worthNowInUSD /
                      (10 ^ 18)
                    )} USDT`
                  : '0 USDT'}
              </Text>
              <View style={styles.returnBox}>
                <Text style={{...FONTS.tertiaryText}} testID="investmentChange">
                  {investmentResult
                    ? `${~~investmentResult?.absoluteReturns} %`
                    : '0.0 %'}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <SubmitBtn
          title={LOCALES.calculate}
          loading={loading}
          inset={memoInset}
          fetchInvestmentCalculator={fetchInvestmentCalculator}
        />
      </SafeAreaView>

      <CustomBottomSheet
        data={poolData}
        setPoolIndex={memoSetPoolIndex}
        setTimeline={memoSetTimeLine}
        sheetState={sheetState}
        bottomSheetRef={bottomSheetRef}
        timeline={timeline}
      />
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    width: width,
    height: height,
    backgroundColor: COLORS.primaryBg,
    justifyContent: 'space-between',
    position: 'relative',
  },
  image: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(8),
    marginRight: scale(8),
  },
  wrapper: {
    paddingTop: scale(16),
    width: width * 0.9,
    marginHorizontal: width * 0.05,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.04,
  },
  investSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: scale(156),
  },
  investBox: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    backgroundColor: COLORS.secondaryBg,
    borderRadius: scale(10),
    minWidth: width * 0.2,
    minHeight: scale(32),
  },
  textInput: {
    maxWidth: width * 0.2,
    ...FONTS.secondaryText,
    height: scale(18),
    padding: 0,
  },
  poolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.6,
    paddingHorizontal: scale(12),
  },
  poolBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  returnBox: {
    paddingHorizontal: scale(4),
    paddingVertical: scale(4),
    backgroundColor: COLORS.successLight,
    borderRadius: scale(8),
    marginRight: 'auto',
  },
});

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <Main />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export {Main};

export default App;
