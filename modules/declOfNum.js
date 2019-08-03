/**
 * Declination of numbers
 * @param {number} number
 * @param {array} titles
 *
 * use: declOfNum(count, ['найдена', 'найдено', 'найдены']);
 */
module.exports = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};