const splitStringToTime = require('./splitStringToTime');

describe('splitStringToTime', () => {
  test('should return correct value', () => {
    const result = splitStringToTime('3:2:1');

    expect(result.hours).toBe(3);
    expect(result.minutes).toBe(2);
    expect(result.seconds).toBe(1);
  });

  test('should return undefined', () => {
    const firstIncorrectData = '3';
    const secondIncorrectData = '3:2';
    const thirdIncorrectData = 'ks:ee:e3';

    expect(splitStringToTime(firstIncorrectData)).toBe(undefined);
    expect(splitStringToTime(secondIncorrectData)).toBe(undefined);
    expect(splitStringToTime(thirdIncorrectData)).toBe(undefined);
  });
});
