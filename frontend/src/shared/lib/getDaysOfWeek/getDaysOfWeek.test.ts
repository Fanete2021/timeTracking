import { getDaysOfWeek } from './getDaysOfWeek';

const mockDate: Date = new Date('2023-10-02');

jest
  .useFakeTimers()
  .setSystemTime(new Date(mockDate));

describe('getDaysOfWeek', () => {
  test('should return one name of day', () => {
    const result = getDaysOfWeek(1);

    expect(result[0]).toBe('Понедельник');
  });

  test('should return week', () => {
    const result = getDaysOfWeek(7);
    const expectedResult = [ 'Понедельник', 'Воскресенье', 'Суббота', 'Пятница', 'Четверг', 'Среда', 'Вторник' ];

    expect(result).toEqual(expectedResult);
  });
});
