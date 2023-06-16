import {timeLineArr} from '../constants/helper';

export function simplifyAmount(number: number) {
  const suffixes = ['', 'k', 'm', 'b', 't'];
  const suffixNum = Math.floor(('' + number).length / 3);
  let shortValue: string | number = parseFloat(
    (suffixNum !== 0 ? number / Math.pow(1000, suffixNum) : number).toPrecision(
      2,
    ),
  );
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
}

export function simplifyYears(number: number) {
  // if (number == 1) return 'Present';
  // else
  return `${Math.round(number)} yrs`;
}

export function investmentCountCalculator(
  years: number,
  timelineIndex: number,
) {
  return Math.floor((365 * years) / timeLineArr[timelineIndex].days);
}
