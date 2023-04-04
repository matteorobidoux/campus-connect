/**
 * @author Marian Hristov
 *
 * Validation utilities
 * 
 * @export function
 */

/**
 * Validates wherether the given string's length is 
 * within the given range
 * @export
 * @param {string} str String to validate
 * @param {number} min Minimum length
 * @param {number} max Maximum length
 * @return {*}  {boolean}
 */
export function validateStringLengthRange(
  str: string,
  min: number,
  max: number
): boolean {
  // Making sure there's no negatives
  min = min < 0 ? 0 : min;
  max = max < 0 ? 0 : max;

  // Swaping values if min is less than max
  if (min > max) {
    max = [min, (min = max)][0];
  }

  return str.length >= min && str.length <= max;
}

/**
 * Validates wherether the given date is the current day
 * Only looks at the year, month and date
 * @export
 * @param {Date} date
 * @return {*}  {boolean}
 */
export function isDateCurrentDay(date: Date): boolean {
  const currentDate = new Date();

  return (
    (date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()) ||
    date > currentDate
  );
}
