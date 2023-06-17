import {timeLineArr} from '../constants/helper';

/**
 * simplifyAmount
 * Convert number to compact form
 *
 * @param  {number} number Enter number to compact
 */
export function simplifyAmount(number: number) {
  if (number < 1e3) return number + '';
  if (number >= 1e3 && number < 1e6) return +(number / 1e3).toFixed(1) + 'K';
  if (number >= 1e6 && number < 1e9) return +(number / 1e6).toFixed(1) + 'M';
  if (number >= 1e9 && number < 1e12) return +(number / 1e9).toFixed(1) + 'B';
  if (number >= 1e12) return +(number / 1e12).toFixed(1) + 'T';
}

/**
 * simplifyYears
 * Convert number to years string
 *
 * @param  {number} number Enter number to convert to years
 */
export function simplifyYears(number: number) {
  return `${Math.round(number)} yrs`;
}

/**
 * investmentCountCalculator
 * Get investment count
 *
 * @param  {number} years Enter number of years
 * @param  {number} timelineIndex Enter selected timeline index
 */
export function investmentCountCalculator(
  years: number,
  timelineIndex: number,
) {
  return Math.floor((365 * years) / timeLineArr[timelineIndex].days);
}
