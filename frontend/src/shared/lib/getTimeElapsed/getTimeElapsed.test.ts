import { getTimeElapsed } from './getTimeElapsed';
import { Time } from 'shared/ui';

const mockDate: Date = new Date('2023-10-02 0:0:0');

jest
  .useFakeTimers()
  .setSystemTime(new Date(mockDate));

describe('getStartAndEndDay', () => {
  test('should return 24 hours', () => {
    const result = getTimeElapsed(new Date('2023-10-01 0:0:0'));
    const expectedResult: Time = { hours: 24, seconds: 0, minutes: 0 };

    expect(result).toEqual(expectedResult);
  });
});
