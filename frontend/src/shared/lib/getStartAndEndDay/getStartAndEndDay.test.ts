import { getStartAndEndDay } from './getStartAndEndDay';

const mockDate: Date = new Date('2023-10-02');

jest
  .useFakeTimers()
  .setSystemTime(new Date(mockDate));

describe('getStartAndEndDay', () => {
  test('should return current dates', () => {
    const firstResult = new Date('2023-10-02 0:0:0');
    const secondsResult = new Date('2023-10-02 23:59:59');
    const { startDay, endDay } = getStartAndEndDay(0);

    expect(firstResult).toEqual(startDay);
    expect(secondsResult).toEqual(endDay);
  });

  test('should return two days ago dates', () => {
    const firstResult = new Date('2023-09-30 0:0:0');
    const secondsResult = new Date('2023-09-30 23:59:59');
    const { startDay, endDay } = getStartAndEndDay(2);

    expect(firstResult).toEqual(startDay);
    expect(secondsResult).toEqual(endDay);
  });
});
