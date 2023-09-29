const sumTime = require('./sumTime');

describe('sumTime', () => {
  test('should return correct value', () => {
    const a = { hours : 3, minutes: 2, seconds: 1};
    const b = { hours : 4, minutes: 2, seconds: 1};
    const result = sumTime(a, b);

    expect(result).toBe('7:4:2');
  });

  test('should return undefined', () => {
    const firstIncorrectData = { hours : 3};
    const secondIncorrectData = { hours : 3, minutes: 2 };
    const thirdIncorrectData = { hours : '32', minutes: '1e', seconds: '434e'};

    expect(sumTime(firstIncorrectData, secondIncorrectData)).toBe(undefined);
    expect(sumTime(thirdIncorrectData, thirdIncorrectData)).toBe(undefined);
  });
});
