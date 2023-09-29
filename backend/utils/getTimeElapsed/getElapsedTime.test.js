const getElapsedTime = require('./getElapsedTime');

describe('splitDate', () => {
  test('should return 3 seconds', () => {
    const currentDate = new Date();
    const threeSecondsAgo = new Date(currentDate.getTime() - 3000);

    const result = getElapsedTime(threeSecondsAgo);

    expect(result.seconds).toBe(3);
  });

  test('should return 1 hour', () => {
    const currentDate = new Date();
    const oneHourAgo = new Date(currentDate.getTime() - 60 * 60 * 1000);

    const result = getElapsedTime(oneHourAgo);

    expect(result.hours).toBe(1);
  });

  test('should return 1 hour 1 min 1 sec', () => {
    const currentDate = new Date();
    const oneHourAgo = new Date(currentDate.getTime() - (60 * 60 * 1000 + 60 * 1000 + 1000));

    const result = getElapsedTime(oneHourAgo);

    expect(result.hours).toBe(1);
    expect(result.minutes).toBe(1);
    expect(result.seconds).toBe(1);
  });

  test('should return return undefined', () => {
    const result = getElapsedTime({});

    expect(result).toBe(undefined);
  });
});
